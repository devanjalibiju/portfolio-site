console.log("Script loaded");
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault(); // prevent form from refreshing the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(res => res.json())
    .then(data => {
        const msg = document.getElementById("responseMsg");
        msg.innerText = data.message;
        msg.style.color = "green"; // success message color
        document.getElementById("contactForm").reset(); // clear the form
    })
    .catch(err => {
        const msg = document.getElementById("responseMsg");
        msg.innerText = "Error sending message!";
        msg.style.color = "red"; // error message color
        console.error(err); // show the error in console
    });
});