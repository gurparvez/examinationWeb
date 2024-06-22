function formatLine(str) {
    // Split the string into words using space as delimiter
    const words = str.split(' ');

    // Map through each word and capitalize the first letter
    const capitalizedWords = words.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a single string with spaces in between
    return capitalizedWords.join(' ');
}

export default formatLine;
