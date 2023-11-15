document.addEventListener('DOMContentLoaded', () => {
    let events; // Define events variable
    let selectedIndex = 0; // Initialize selectedIndex
    let timerId; // Timer for advancing to the next event

    // Fetch event data with images
    getUMEventsWithImages(eventsData => {
        events = eventsData; // Assign eventsData to events variable
        const thumbnailsDiv = document.getElementById('thumbnails');

        // Function to create a thumbnail element for an event
        const createThumbnail = (event, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = event.styled_images.event_thumb;
            thumbnail.alt = event.title;
            thumbnail.addEventListener('click', () => handleThumbnailClick(index));
            return thumbnail;
        };

        const handleThumbnailClick = index => {
            setSelectedIndex(index);
            resetTimer();
        };

        const advanceToNextEvent = () => {
            setSelectedIndex((selectedIndex + 1) % events.length);
            resetTimer(); // Reset timer 
        };

        const resetTimer = () => {
            clearTimeout(timerId);
            timerId = setTimeout(advanceToNextEvent, 10000);
        };

        const setSelectedIndex = index => {
            const thumbnails = document.querySelectorAll('#thumbnails img');
            thumbnails[selectedIndex].classList.remove('selected');
            thumbnails[index].classList.add('selected');
            selectedIndex = index;
            updateSelectedEventDetails();
        };

        const updateSelectedEventDetails = () => {
            console.log('Updating selected event details...');
            const selectedEvent = events[selectedIndex];
            console.log('Selected event:', selectedEvent);

            const selectedImage = document.getElementById('selected-image');
            const selectedTitle = document.getElementById('selected-title');
            const selectedDate = document.getElementById('selected-date');
            const selectedDescription = document.getElementById('selected-description');

            selectedImage.src = selectedEvent.image_url;
            selectedTitle.innerText = selectedEvent.event_title || "Title Not Available";
            selectedTitle.href = selectedEvent.permalink;
            selectedDate.innerText = getReadableTime(selectedEvent.datetime_start);
            selectedDescription.innerText = selectedEvent.description;
        };

        // Populate thumbnails
        events.forEach((event, index) => {
            const thumbnail = createThumbnail(event, index);
            thumbnailsDiv.appendChild(thumbnail);
        });

        // Set the first thumbnail as selectedhttps://events.umich.edu/media/cache/event_thumb/media/attachments/2023/07/event_109592_original-1.jpg
        const firstThumbnail = document.querySelector('#thumbnails img');
        if (firstThumbnail) {
            firstThumbnail.classList.add('selected');
        }

        // Initialize the selected event details
        updateSelectedEventDetails();

        // Start the timer for automatic event advancement
        resetTimer();
    });
});

    