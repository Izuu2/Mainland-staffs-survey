const steps = document.querySelectorAll('.step');
const nextBtn = document.getElementById('nextBtn');
const form = document.getElementById('surveyForm');
let currentStep = 0;

// Show or hide "Others" input based on location selection
const locationSelect = document.getElementById("location");
const otherInput = document.getElementById("otherLocation");

locationSelect.addEventListener("change", function () {
  if (this.value === "Others") {
    otherInput.style.display = "block";
    otherInput.required = true;
  } else {
    otherInput.style.display = "none";
    otherInput.required = false;
  }
});

// Show the current step and update button text/type
function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle('active', i === index);
  });

  // Change button text and type on the last step
  nextBtn.textContent = (index === steps.length - 1) ? 'Submit' : 'Next';
  nextBtn.setAttribute('type', (index === steps.length - 1) ? 'submit' : 'button');
}

// Step through the form
nextBtn.addEventListener('click', (event) => {
  // Prevent default behavior if not final step
  if (nextBtn.getAttribute('type') === 'button') {
    event.preventDefault();

    // Validate current step input
    const currentInput = steps[currentStep].querySelector('input, select, textarea');
    if (currentInput && !currentInput.checkValidity()) {
      currentInput.reportValidity();
      return;
    }

    // Move to next step
    if (currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }
});

// Show the first step initially
showStep(currentStep);
