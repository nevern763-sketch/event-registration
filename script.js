<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Event Registration</title>
  <style>
    body { font-family: Arial, sans-serif; background: #f4f4f9; }
    .success { color: green; margin-top: 10px; }
    .error { color: red; margin-top: 10px; }
    input.valid { border: 2px solid green; }
    input.invalid { border: 2px solid red; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    table, th, td { border: 1px solid #ccc; }
    th { background: #333; color: #fff; }
    tr:nth-child(even) { background: #f9f9f9; }
  </style>
</head>
<body>

  <h2>Event Registration Form</h2>
  <form id="registrationForm">
    <label>Name: <input type="text" id="name" required></label><br><br>
    <label>Email: <input type="email" id="email" required></label><br><br>
    <label>Phone: <input type="text" id="phone" required></label><br><br>
    <label><input type="checkbox" id="declaration"> I agree to the terms</label><br><br>
    <button type="submit">Submit</button>
    <button type="reset">Reset</button>
  </form>

  <div id="message"></div>

  <h3>Registered Participants</h3>
  <table id="participantsTable">
    <thead>
      <tr>
        <th>Name</th><th>Email</th><th>Phone</th>
      </tr>
    </thead>
    <tbody></tbody>
  </table>

  <script>
    const form = document.getElementById('registrationForm');
    const message = document.getElementById('message');
    const tableBody = document.querySelector('#participantsTable tbody');

    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Prevent page reload

      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const declaration = document.getElementById('declaration');

      // Validation
      [name, email, phone].forEach(field => {
        if (!field.value.trim()) {
          field.classList.add('invalid');
          field.classList.remove('valid');
          valid = false;
        } else {
          field.classList.add('valid');
          field.classList.remove('invalid');
        }
      });

      if (!declaration.checked) {
        valid = false;
        alert("You must agree to the terms before submitting.");
      }

      if (!valid) {
        message.textContent = "Please fill all required fields correctly.";
        message.className = "error";
        return;
      }

      // Add participant to table
      const row = document.createElement('tr');
      row.innerHTML = `<td>${name.value}</td><td>${email.value}</td><td>${phone.value}</td>`;
      tableBody.appendChild(row);

      // Success message
      message.textContent = "Registration successful!";
      message.className = "success";

      // Clear form
      form.reset();
      [name, email, phone].forEach(field => {
        field.classList.remove('valid', 'invalid');
      });

      // Remove success message after 3 seconds
      setTimeout(() => {
        message.textContent = "";
      }, 3000);
    });
  </script>

</body>
</html>
