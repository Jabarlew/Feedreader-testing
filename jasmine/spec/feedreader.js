/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        //  Test that loops through whole feed and checks if URL is defined and not empty
        it('checks if URL is defined and not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });

        })

        //  Test that loops through whole feed and checks if name is defined and not empty

        it('checks if name is defined and not empty', function () {
            allFeeds.forEach(feed => {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        })
    });


    // New test suite
    describe('The Menu', () => {

        // Test that check if menu element is hidden by default
        it('checks if menu is hidden by default', () => {
            const body = document.body;
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });


        //  Test that check if clicking on menu icon shows and hides the menu
        it('checks menu visability on click', () => {
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);
            document.querySelector('.menu-icon-link').click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

    });
    // New test suite

    describe('Initial Entries', () => {


        // test that ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
        // i use beforeEach cause function is asynchronous
        beforeEach((done) => {
            loadFeed(0, done);
        });

        it('has at least single element within the feed container', () => {
            expect(document.querySelectorAll('.feed .entry').length)
            .toBeGreaterThan(0);
        });
    });





    // New test suite
    describe('New Feed Selection', () => {
        let oldFeedTitle;
        let newFeedTitle;

        // i use beforeEach cause function is asynchronous
        beforeEach((done) => {
            loadFeed(0, () => {
                oldFeedTitle = document.querySelector('.feed h2').textContent;

                loadFeed(1, () => {
                    newFeedTitle = document.querySelector('.feed h2').textContent;
                    done();
                });
            });
        });

        // test that ensures when a new feed is loaded by the loadFeed function that the content is not the same.

        it('check content change', (done) => {
            expect(oldFeedTitle).not.toEqual(newFeedTitle);
            done();
        });

    });
}());