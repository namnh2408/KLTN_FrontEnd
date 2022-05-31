export class CommentModel {
    ProductDetailId: number;
    Content: string;

    constructor(){
        this.ProductDetailId = 0;
        this.Content = "";
    }
}

export class CommentCondition{
    ProductCommentId : number;
    Content: string;
    Rating: number;

    constructor(){
        this.ProductCommentId = 0;
        this.Content = '';
        this.Rating = 0;
    }
}