using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;

namespace LibIT.Web.Helpers
{
    public class ImageUploader
    {
        public static Bitmap CreateImage(Bitmap originalPic, int maxWidth = 50, int maxHeight = 50)
        {
            try
            {
                var width = originalPic.Width;
                var height = originalPic.Height;
                var widthDiff = width - maxWidth;
                var heightDiff = height - maxHeight;
                var doWidthResize = (maxWidth > 0 && width > maxWidth && widthDiff > heightDiff);
                var doHeightResize = (maxHeight > 0 && height > maxHeight && heightDiff > widthDiff);

                if (doWidthResize || doHeightResize || (width.Equals(height) && widthDiff.Equals(heightDiff)))
                {
                    var iStart = default(int);
                    var divider = default(decimal);
                    if (doWidthResize)
                    {
                        iStart = width;
                        divider = Math.Abs((decimal)iStart / maxWidth);
                        width = maxWidth;
                        height = (int)Math.Round((height / divider));
                    }
                    else
                    {
                        iStart = height;
                        divider = Math.Abs((decimal)iStart / maxHeight);
                        height = maxHeight;
                        width = (int)Math.Round(width / divider);
                    }
                }
                using (var outBmp = new Bitmap(width, height, PixelFormat.Format24bppRgb))
                {
                    using (var oGraphics = Graphics.FromImage(outBmp))
                    {
                        oGraphics.DrawImage(originalPic, 0, 0, width, height);
                        //Водяний знак
                        //Font font = new Font("Arial", 20);
                        //Brush brash = new SolidBrush(Color.Blue);
                        //oGraphics.DrawString("Hello Vova", font, brash, new Point(25, 25));
                        return new Bitmap(outBmp);
                    }
                }
            }
            catch
            {
                return null;
            }
        }

        public static Bitmap FromBase64StringToImage(string base64String)
        {
            var byteBuffer = Convert.FromBase64String(base64String);
            try
            {
                using (var memoryStream = new MemoryStream(byteBuffer))
                {
                    memoryStream.Position = 0;
                    using (var imgReturn = Image.FromStream(memoryStream))
                    {
                        memoryStream.Close();
                        byteBuffer = null;
                        return new Bitmap(imgReturn);
                    }
                }
            }
            catch { return null; }

        }
    }
}
