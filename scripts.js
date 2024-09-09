// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}

scrollToTopBtn.addEventListener('click', function() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('productList');

    // Handle View Product button click
    productList.addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('btn-primary')) {
            const productCard = event.target.closest('.product-card');
            const img = productCard.querySelector('img');

            const image = new Image();
            image.src = img.src;

            image.onload = function () {
                const width = this.width;
                const height = this.height;
                const productId = event.target.getAttribute('href').split('=')[1]; // Assuming `productId` is part of the href

                const params = new URLSearchParams({
                    productId: productId,
                    title: event.target.getAttribute('data-title'),
                    price: event.target.getAttribute('data-price'),
                    image: event.target.getAttribute('data-image'),
                    description: event.target.getAttribute('data-description'),
                    width: width,
                    height: height
                });

                window.location.href = `product-view.html?${params.toString()}`;
            };
        }
    });
});
