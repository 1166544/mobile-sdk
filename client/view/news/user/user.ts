// 导入当前页面中共用代码片断
import {a, b} from "../common/item-a/item-a";

// 导入调用示例
console.log(a);
console.log(b);

class Shape {
    public area: number;
    public color: string;

    constructor(name: string, width: number, height: number) {
        this.area = width * height;
        this.color = "pink";
    }

    public shoutout(): string {
        return `I\'m ${this.color} with an area of ${this.area} cm squared.`;
    }
}

const square: Shape = new Shape("square", 30, 30);

console.log(square.shoutout());
console.log(`Area of Shape: ${square.area}`);
console.log(`Color of Shape: ${square.color}`);
document.querySelector("div").innerHTML = "after bundle1";
$("div").eq(1).css({width: "800px", heihgt: "400px"});
