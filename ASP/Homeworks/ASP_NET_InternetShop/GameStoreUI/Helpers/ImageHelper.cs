using System;
using System.Drawing;
using System.Drawing.Imaging;

namespace GameStoreUI.Helpers
{
    public static class ImageHelper
    {
        public static Bitmap CreateImage(Bitmap originalPic, int maxWidth, int maxHeight)
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
                    int iStart;
                    decimal divider;

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
    }
}