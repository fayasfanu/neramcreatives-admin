import React from 'react';

const FormToSheetTest = () => {
  function Submit(e) {
    e.preventDefault();

    const formData = new FormData(e.target); // `e.target` refers to the form

    fetch("https://script.google.com/macros/s/AKfycbxPGegV8pufRuftcg89a1dYHxWOv_xwlecsU-ulPYMkLiINZcgDxVVrP7gdmrFXCvmi/exec", {
      method: "POST",
      body: formData
    })
    .then(response => response.text()) // Change to `.text()`
    .then(data => console.log("Success:", data)) // Logs the actual response
    .catch(error => console.error("Error:", error));
  }

  return (
    <div>
      <h1>React to Google Sheet</h1>
      <form className="form" onSubmit={Submit}>
        <input name="Name" placeholder="Name" type="text" required /> <br />
        <input name="Email" placeholder="Email" type="email" required /> <br />
        <input name="Message" placeholder="Message" type="text" required /> <br />
        <button className="submit button" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormToSheetTest;
