const splitArrayIntoChunks = (arr, size) => {
    const tempArray = [];

    for (let i = 0; i < arr.length; i += size) {
        const myChunk = arr.slice(i, i + size);
        tempArray.push(myChunk);
    }

    return tempArray;
};

export default splitArrayIntoChunks;
