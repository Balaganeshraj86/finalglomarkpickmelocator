// Store locations (keeping this data for potential future use)
const stores = [
    { id: "store-wattala", name: "Glomark Wattala", lat: 6.991337, lng: 79.889625 },
    { id: "store-kandy", name: "Glomark Kandy", lat: 7.293497, lng: 80.635010 },
    { id: "store-kandana", name: "Glomark Kandana", lat: 7.048293, lng: 79.892387 },
    { id: "store-thalawathugoda", name: "Glomark Thalawathugoda", lat: 6.872935, lng: 79.909944 },
    { id: "store-negombo", name: "Glomark Negombo", lat: 7.211580, lng: 79.839279 },
    { id: "store-kurunegala", name: "Glomark Kurunegala", lat: 7.484999, lng: 80.362739 },
    { id: "store-kottawa", name: "Glomark Kottawa", lat: 6.841352, lng: 79.968410 },
    { id: "store-mtlavinia", name: "Glomark Mount Lavinia", lat: 6.839844, lng: 79.867409 },
    { id: "store-nawala", name: "Glomark Nawala", lat: 6.894882, lng: 79.889051 }
];

// Slider functionality
document.addEventListener("DOMContentLoaded", function() {
    // Elements
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.slider-dot');
    const prev = document.querySelector('.slider-prev');
    const next = document.querySelector('.slider-next');
    let currentIndex = 0;
    
    // Set interval for automatic sliding
    const slideInterval = setInterval(nextSlide, 5000);
    
    // Next slide function
    function nextSlide() {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex + 1) % slides.length;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Previous slide function
    function prevSlide() {
        slides[currentIndex].classList.remove('active');
        dots[currentIndex].classList.remove('active');
        
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        
        slides[currentIndex].classList.add('active');
        dots[currentIndex].classList.add('active');
    }
    
    // Set event listeners for navigation
    if (next) {
        next.addEventListener('click', function() {
            clearInterval(slideInterval);
            nextSlide();
        });
    }
    
    if (prev) {
        prev.addEventListener('click', function() {
            clearInterval(slideInterval);
            prevSlide();
        });
    }
    
    // Add event listeners to dots
    dots.forEach(dot => {
        dot.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            
            if (index !== currentIndex) {
                clearInterval(slideInterval);
                
                slides[currentIndex].classList.remove('active');
                dots[currentIndex].classList.remove('active');
                
                currentIndex = index;
                
                slides[currentIndex].classList.add('active');
                dots[currentIndex].classList.add('active');
            }
        });
    });
    
    // Fix for store button links
    const storeLinks = document.querySelectorAll("#store-buttons a");
    
    storeLinks.forEach(link => {
        const originalHref = link.getAttribute("href");
        const storeButton = link.querySelector("button");
        const storeId = link.getAttribute("id");
        
        // Remove the href attribute from the link
        link.removeAttribute("href");
        
        // Add click event to the button
        storeButton.addEventListener("click", function() {
            // Add subtle animation to button click
            this.style.transform = "scale(0.95)";
            setTimeout(() => {
                this.style.transform = "";
            }, 200);
            
            // Navigate to the original href
            setTimeout(() => {
                window.location.href = originalHref;
            }, 300);
        });
    });
    
    // Highlight random store (to draw attention)
    function highlightRandomStore() {
        // Reset all buttons
        const storeButtons = document.querySelectorAll("#store-buttons button");
        storeButtons.forEach(button => {
            button.classList.remove("nearest");
        });
        
        // Select random store
        const randomIndex = Math.floor(Math.random() * stores.length);
        const randomStoreId = stores[randomIndex].id;
        
        // Highlight it
        const storeElement = document.getElementById(randomStoreId);
        if (storeElement) {
            const button = storeElement.querySelector("button");
            button.classList.add("nearest");
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                button.classList.remove("nearest");
            }, 3000);
        }
    }
    
    // Highlight random stores periodically
    setInterval(highlightRandomStore, 10000);
});