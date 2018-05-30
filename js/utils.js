export const dist = (obj1, obj2) => Math.sqrt(
    (Math.pow(obj2.x - obj1.x, 2)) +
    (Math.pow(obj2.y - obj1.y, 2))
);
export const angleBetween = (p1, p2) => Math.atan2(p2.y - p1.y, p2.x - p1.x)// * 180 / Math.PI;
export const clearArray = (arr) => {
    while(arr.length > 0)
        arr.pop();
}