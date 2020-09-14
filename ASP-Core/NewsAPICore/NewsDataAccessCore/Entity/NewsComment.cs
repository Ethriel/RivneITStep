namespace NewsDataAccessCore.Entity
{
    public class NewsComment
    {
        public int NewsId { get; set; }
        public virtual News News { get; set; }
        public int CommentId { get; set; }
        public virtual Comment Comment { get; set; }
    }
}
