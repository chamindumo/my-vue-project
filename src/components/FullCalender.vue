<template>
  <div class="app">
    <NavigationBar />
    <Headder />
    
    <div class="button-container">
      <el-button @click="addDrawer" icon="el-icon-plus" class="button-style" size="medium">Add Event</el-button>
    </div>
    <br>
    <br>
    <br>
    <div class="calendar-container">
      <div ref="calendarEl"></div>
    </div>

<!-- Drawer -->
<div v-if="isAddDrawerOpen" class="drawer open">
  <form @submit="createEvent" class="event-form">
    <label for="eventTitle">Event Title:</label>
    <input id="eventTitle" v-model="newEventTitle" type="text" required />
    <label for="eventStart">Event Start:</label>
    <input id="eventStart" v-model="newEventStart" type="datetime-local" required />
    <label for="eventEnd">Event End:</label>
    <input id="eventEnd" v-model="newEventEnd" type="datetime-local" required />
    <label for="userEmail">Your Email:</label>
    <input id="userEmail" v-model="userEmail" type="email" required />
    <button type="submit">Add Event</button>
  </form>
  </div>
  <div v-if="isDrawerOpen" class="drawer open">

  <form v-if="isUpdating" @submit="updateEvent" class="event-form">
        <label for="eventTitle">Event Title:</label>
        <input id="eventTitle" v-model="updateEventTitle" type="text" required />
        <label for="eventStart">Event Start:</label>
        <input id="eventStart" v-model="updateEventStart" type="datetime-local" required />
        <label for="eventEnd">Event End:</label>
        <input id="eventEnd" v-model="updateEventEnd" type="datetime-local" required />
        <label for="userEmail">Your Email:</label>
        <input id="userEmail" v-model="userEmail" type="email" required />
        <button type="submit">Update Event</button>
      
      <el-button @click="deleteEvent" class="delete-button">Delete Event</el-button>
</form>
</div>
<Fotter />

</div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
import Headder from './Headder.vue';
import Fotter from './Fotter.vue';
import 'C:/Users/janit/source/repos/Nayana mama front/my-vue-project/src/StyleSheet.css'

export default {
  components: { NavigationBar, Headder, Fotter },

  setup() {
    const calendarEl = ref(null);
    let calendar;
    const newEventTitle = ref('');
    const newEventStart = ref('');
    const newEventEnd = ref('');
    const updateEventTitle = ref('');
    const updateEventStart = ref('');
    const updateEventEnd = ref('');
    const userEmail = ref('');
    const events = ref([]);
    const isDrawerOpen = ref(false); // Added
    const isAddDrawerOpen = ref(false); // Added
    const isUpdating = ref(false); // Flag to indicate update mode
    let currentEvent = null; 
    const currentEventId = null; // To store the ID of the event being updated
    const startTime = ref('');
    const endTime = ref('');



    function toggleDrawer() {
      isDrawerOpen.value = !isDrawerOpen.value;
      isUpdating.value = false;
    }

    function addDrawer() {
      isAddDrawerOpen.value = !isAddDrawerOpen.value;
    }

    onMounted(() => {
      fetchEvents();

      calendar = new Calendar(calendarEl.value, {
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay',
        },
        editable: true,
        selectable: true,
        select: onDateSelect,
        eventClick: onEventClick, // Add event click callback
        events: [events]
      });
console.log(events)
      calendar.render();
    });

    function onDateSelect(arg) {
      // This function remains the same as in your original code.
      const title = prompt('Event Title:');
      if (title) {
        calendar.addEvent({
          title,
          start: arg.start,
          end: arg.end,
          allDay: arg.allDay,
        });
      }
    }



    function onEventClick(arg) {
      // When an event is clicked, populate the update form with event data
      currentEvent = arg.event;
      updateEventTitle.value = currentEvent.title;
      updateEventStart.value = currentEvent.start.toISOString().slice(0, 16);
      updateEventEnd.value = currentEvent.end.toISOString().slice(0, 16);
      userEmail.value = ''; // You can update the user email if needed
      isUpdating.value = true; // Switch to update mode
      isDrawerOpen.value = true; // Open the drawer
      startTime.value = formatDateTime(currentEvent.start)
      endTime.value = formatDateTime(currentEvent.end) 
      console.log(formatDateTime(currentEvent.start))
      console.log(startTime.value)


    }
    


    function formatDateTime(inputDateTimeString) {
  // Parse the input date and time string
  const inputDate = new Date(inputDateTimeString);

  // Get the year, month, day, hours, and minutes from the input date
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  // Create the formatted date-time string
  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return formattedDateTime;
}

    async function updateEvent(event) {
      event.preventDefault();

      if (currentEvent && updateEventTitle.value && updateEventStart.value && updateEventEnd.value && userEmail.value) {
        const updatedEvent = {
          event: updateEventTitle.value,
          startDate: updateEventStart.value,
          endDate: updateEventEnd.value,
          email: userEmail.value,
        };

        try {
          // Send a PUT request to update the event on the backend
          await axios.put(`https://localhost:7141/api/calendar/events/{id}?startTime=${startTime.value}&endTime=${endTime.value}`, updatedEvent);
          console.log('Event updated successfully!');
        } catch (error) {
          console.error('Error updating event:', error);
        }

        currentEvent.setProps(updatedEvent); // Update the event in the calendar
        toggleDrawer(); // Close the drawer
      }
    }


    async function deleteEvent() {
      if (currentEvent) {
        const eventId = currentEvent.id;

        try {
          // Send a DELETE request to the backend to delete the event
          await axios.delete(`https://localhost:7141/api/calendar/events/{id}?startTime=${startTime.value}&endTime=${endTime.value}`);
          console.log('Event deleted successfully!');
        } catch (error) {
          console.error('Error deleting event:', error);
        }

        calendar.getEventById(eventId).remove(); // Remove the event from the calendar
        toggleDrawer(); // Close the drawer
      }
    }

    // ... (other functions) ...

   


    async function fetchEvents() {
      try {
        const response = await axios.get('https://localhost:7141/api/calendar/events');

        // Assuming the response data is an array of events objects
        const fetchedEvents = response.data.map(event => ({
          id: event.id,
          title: event.event, // Map the event title from the 'event' field
          start: event.startDate, // Map the event start date from the 'startDate' field
          end: event.endDate, // Map the event end date from the 'endDate' field
        }));
        calendar.removeAllEvents();
        calendar.addEventSource(fetchedEvents);      
      console.log(events.value)

      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

   async function createEvent(event) {
      event.preventDefault();

      const eventTitle = newEventTitle.value;
      const startDate = newEventStart.value;
      const endDate = newEventEnd.value;
      const email = userEmail.value;
      let createdEventId; // Declare createdEventId in the function scope

      const title = newEventTitle.value;
      const start = newEventStart.value;
      const end = newEventEnd.value;

      if (eventTitle && startDate && endDate && email) {

        try {
          // Send a POST request to the backend to save the event data
          const response =  await axios.post('https://localhost:7141/api/calendar/events', {
            event: eventTitle,
            startDate: startDate,
            endDate: endDate,
            email,
          });
          createdEventId = response.data.id;
        console.log(createdEventId)
          await axios.post('https://localhost:7141/api/calender/send-email', {
            event: eventTitle,
            startDate: startDate,
            endDate: endDate,
            email,
          });
          console.log('Event saved successfully!');
        } catch (error) {
          console.error('Error saving event:', error);
        }

        calendar.addEvent({
          id: createdEventId,
          title,
          start,
          end,
        });

        // Clear the form fields after adding the event
        newEventTitle.value = '';
        newEventStart.value = '';
        newEventEnd.value = '';
        userEmail.value = '';
      }
    }

    return {
      calendarEl,
      newEventTitle,
      newEventStart,
      newEventEnd,
      createEvent,
      userEmail,
      events,
      toggleDrawer, // Added
      isDrawerOpen, 
      updateEventTitle,
      updateEventStart,
      updateEventEnd,
      updateEvent,
      isUpdating,
      currentEventId,
      deleteEvent,
      isAddDrawerOpen,
      addDrawer


    };
  },
};
</script>
<style scoped>
</style> 