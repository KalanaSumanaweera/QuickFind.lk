// ads.js
const advertisements = [
    {
      id: 1,
      title: "John's Electrical Services",
      provider: "John Smith",
      category: "Electrician",
      description: "Specializing in residential and commercial electrical services.",
      location: "Colombo",
      rating: 4.5,
      reviews: 50,
      price: "Starting from 2000 LKR",
      image: "https://source.unsplash.com/random/800x600/?electrician"
    },
    // Add more advertisement objects here
  ];
  
  function getAdById(id) {
    return advertisements.find(ad => ad.id === id);
  }
  
  function getAllAds() {
    return advertisements;
  }