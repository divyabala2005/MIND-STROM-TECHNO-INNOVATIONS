function checkPalindrome() {
    let userInput = document.getElementById("userInput").value;
    
    let cleanedInput = userInput.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    
    let isPalindrome = cleanedInput === cleanedInput.split('').reverse().join('');
    
    let resultDiv = document.getElementById("result");
    if (isPalindrome) {
        resultDiv.innerHTML = `"${userInput}" is a palindrome!`;
        resultDiv.style.color = "green";
    } else {
        resultDiv.innerHTML = `"${userInput}" is not a palindrome.`;
        resultDiv.style.color = "red";
    }
}
