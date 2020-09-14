namespace NewsDataAccessCore.Entity
{
    public class Comment
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Message { get; set; }
        public int NewsId { get; set; }
        public virtual News News { get; set; }
    }
}
