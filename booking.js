// Sample data structure for bookings
let bookings = [];

// Load bookings from localStorage or use empty array
if (localStorage.getItem('bookings')) {
    bookings = JSON.parse(localStorage.getItem('bookings'));
}

document.addEventListener('DOMContentLoaded', function() {
    flatpickr("#datepicker", {
        minDate: "today",
        dateFormat: "Y-m-d",
        onChange: function(selectedDates, dateStr, instance) {
            document.getElementById('selectedDate').textContent = dateStr;
            generateTimeSlots(dateStr);
        }
    });

    function generateTimeSlots(selectedDate) {
        const timeSlotsContainer = document.getElementById('timeSlots');
        timeSlotsContainer.innerHTML = '';
        const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
        
        timeSlots.forEach(slot => {
            const button = document.createElement('button');
            button.textContent = slot;
            button.className = 'p-2 border border-gray-300 rounded-md hover:bg-primary hover:text-white transition duration-300';
            
            if (!checkAvailability(selectedDate, slot)) {
                button.classList.add('bg-gray-200', 'text-gray-400', 'cursor-not-allowed');
                button.disabled = true;
            } else {
                button.onclick = function() {
                    document.getElementById('selectedTime').textContent = slot;
                    document.querySelectorAll('#timeSlots button').forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
                    this.classList.add('bg-primary', 'text-white');
                };
            }
            
            timeSlotsContainer.appendChild(button);
        });
    }

    document.getElementById('confirmBooking').addEventListener('click', function() {
        const date = document.getElementById('selectedDate').textContent;
        const time = document.getElementById('selectedTime').textContent;
        const service = document.getElementById('selectedService').textContent;
        const provider = document.getElementById('selectedProvider').textContent;

        if (date !== 'Not selected' && time !== 'Not selected') {
            // Create a new booking
            const newBooking = {
                id: Date.now(), // Use timestamp as a simple unique ID
                date: date,
                time: time,
                service: service,
                provider: provider
            };

            // Add to bookings array
            bookings.push(newBooking);

            // Save to localStorage
            localStorage.setItem('bookings', JSON.stringify(bookings));

            alert(`Booking confirmed!\n\nService: ${service}\nProvider: ${provider}\nDate: ${date}\nTime: ${time}`);

            // Reset selection
            document.getElementById('selectedDate').textContent = 'Not selected';
            document.getElementById('selectedTime').textContent = 'Not selected';
            document.getElementById('datepicker').value = '';
            document.querySelectorAll('#timeSlots button').forEach(btn => btn.classList.remove('bg-primary', 'text-white'));
        } else {
            alert('Please select both date and time before confirming.');
        }
    });
});

// Function to check availability (simulated)
function checkAvailability(date, time) {
    // In a real application, this would check against existing bookings
    // For this example, we'll randomly determine availability
    return Math.random() > 0.3; // 70% chance of being available
}

// Function to get upcoming bookings
function getUpcomingBookings() {
    const today = new Date();
    return bookings.filter(booking => {
        const bookingDate = new Date(booking.date + ' ' + booking.time);
        return bookingDate > today;
    }).sort((a, b) => new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time));
}

// Function to cancel a booking
function cancelBooking(bookingId) {
    const index = bookings.findIndex(booking => booking.id === bookingId);
    if (index !== -1) {
        bookings.splice(index, 1);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return true;
    }
    return false;
}

// Function to reschedule a booking
function rescheduleBooking(bookingId, newDate, newTime) {
    const booking = bookings.find(booking => booking.id === bookingId);
    if (booking) {
        booking.date = newDate;
        booking.time = newTime;
        localStorage.setItem('bookings', JSON.stringify(bookings));
        return true;
    }
    return false;
}

// Function to get booking history
function getBookingHistory() {
    const today = new Date();
    return bookings.filter(booking => {
        const bookingDate = new Date(booking.date + ' ' + booking.time);
        return bookingDate <= today;
    }).sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time));
}