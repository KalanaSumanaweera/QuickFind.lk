// Sample data structure for reviews
let reviews = [];

// Load reviews from localStorage or use empty array
if (localStorage.getItem('reviews')) {
    reviews = JSON.parse(localStorage.getItem('reviews'));
}

// Sample service providers
const serviceProviders = [
    "John's Electrical",
    "Plumb Perfect",
    "Green Thumb Landscaping",
    "Quick Fix Appliances",
    "Clean Sweep Cleaning Services"
];

document.addEventListener('DOMContentLoaded', function() {
    const serviceProviderSelect = document.getElementById('serviceProvider');
    const ratingStars = document.getElementById('ratingStars');
    const reviewForm = document.getElementById('reviewForm');
    const reviewsList = document.getElementById('reviewsList');

    // Populate service provider options
    serviceProviders.forEach(provider => {
        const option = document.createElement('option');
        option.value = provider;
        option.textContent = provider;
        serviceProviderSelect.appendChild(option);
    });

    // Handle star rating
    let currentRating = 0;
    ratingStars.addEventListener('click', function(e) {
        if (e.target.classList.contains('fa-star')) {
            const stars = ratingStars.children;
            const clickedIndex = Array.from(stars).indexOf(e.target);
            currentRating = clickedIndex + 1;
            
            for (let i = 0; i < stars.length; i++) {
                if (i <= clickedIndex) {
                    stars[i].classList.remove('text-gray-300');
                    stars[i].classList.add('text-yellow-400');
                } else {
                    stars[i].classList.remove('text-yellow-400');
                    stars[i].classList.add('text-gray-300');
                }
            }
        }
    });

    // Handle form submission
    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const newReview = {
            id: Date.now(),
            provider: serviceProviderSelect.value,
            rating: currentRating,
            text: document.getElementById('reviewText').value,
            date: new Date().toISOString()
        };

        reviews.push(newReview);
        localStorage.setItem('reviews', JSON.stringify(reviews));

        displayReviews();
        reviewForm.reset();
        resetStars();
    });

    function resetStars() {
        currentRating = 0;
        const stars = ratingStars.children;
        for (let star of stars) {
            star.classList.remove('text-yellow-400');
            star.classList.add('text-gray-300');
        }
    }

    function displayReviews() {
        reviewsList.innerHTML = '';
        const sortedReviews = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));
        
        sortedReviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'mb-4 p-4 border border-gray-200 rounded-md';
            reviewElement.innerHTML = `
                <div class="flex justify-between items-center mb-2">
                    <h4 class="font-bold">${review.provider}</h4>
                    <div class="text-yellow-400">
                        ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                    </div>
                </div>
                <p class="text-text-secondary mb-2">${review.text}</p>
                <p class="text-sm text-gray-500">${new Date(review.date).toLocaleDateString()}</p>
            `;
            reviewsList.appendChild(reviewElement);
        });
    }

    // Initial display of reviews
    displayReviews();
});

// Function to get average rating for a provider
function getAverageRating(providerName) {
    const providerReviews = reviews.filter(review => review.provider === providerName);
    if (providerReviews.length === 0) return 0;
    
    const totalRating = providerReviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / providerReviews.length;
}

// Function to get all reviews for a provider
function getProviderReviews(providerName) {
    return reviews.filter(review => review.provider === providerName)
                  .sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Function to filter reviews by rating
function filterReviewsByRating(minRating) {
    return reviews.filter(review => review.rating >= minRating)
                  .sort((a, b) => new Date(b.date) - new Date(a.date));
}