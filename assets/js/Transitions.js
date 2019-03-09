export default class Transitions {
    setUp() {
        var callback = function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.intersectionRatio > 0) {
                    setTimeout(function () {
                        entry.target.classList.add('show');
                    }, Math.random() * 100);
                }
            });
        }

        var items = document.querySelectorAll('.blog .span6, .columns, .feature, .product_intro > *, .pull-quote');

        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(callback);

            [].forEach.call(items, function (item) {
                observer.observe(item);
            });
        } else {
            [].forEach.call(items, function (item) {
                item.classList.add('show');
            });
        }
    }
}
