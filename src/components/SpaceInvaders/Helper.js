

export const checkCollisionsWith = async (array1, array2) => {
    let a = array1.length - 1
    let b;
    for (a; a > -1; --a ) { // decrementing to avoid missing indexes in next loop
        b = array2.length - 1;
        for (b; b > -1; --b ) {
            let arrayA = array1[a];
            let arrayB = array2[b];

            if ( checkingCollision(arrayA, arrayB)) {
                await arrayA.die();
                await arrayB.die();
                console.log('calling die in helpers', Date.now())
            }
        }
    }

}


// Hypotenuse / Euclidean distance formula to compare the distance between two points and seeing if the sum of their radiuses is less than the distance (otherwise there is an overlap/collision)
export const checkingCollision = (obj1, obj2) => {

    // console.log('object 1', obj1);
    // console.log('object 2', obj2)
    const vx = obj1.position.x - obj2.position.x;
    const vy = obj1.position.y - obj2.position.y;

    const length = Math.sqrt(vx * vx + vy * vy);

    if ( length < obj1.radius + obj2.radius ) {
        return true;
    }
    return false;
}
