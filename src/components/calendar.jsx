'use client';

import { Button } from '@/components/ui/button';
import { Drawer } from '@/components/ui/drawer';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { HashLink } from 'react-router-hash-link';
import { BookOpen, Menu, Moon, Sun, X } from 'lucide-react';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const monthsWith30Days = [3, 5, 8, 10]; // April, June, September, November

export const ContinuousCalendar = () => {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState(today.getDate());
  const [events, setEvents] = useState([]); // To store events
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setTheme } = useTheme();
  const [newEvent, setNewEvent] = useState({
    name: '',
    time: '',
    notes: '',
    date: today.getDate(),
  });

  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    if (selectedMonth === 0) setYear(year - 1);  // Decrement year if January is selected
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    if (selectedMonth === 11) setYear(year + 1);  // Increment year if December is selected
  };

  const handleToday = () => {
    setSelectedMonth(today.getMonth());
    setSelectedDate(today.getDate());
  };

  const generateCalendar = () => {
    let totalDays;

    // Check if the selected month has 30 days
    if (monthsWith30Days.includes(selectedMonth)) {
      totalDays = 30;
    } else {
      // Get the total number of days for the selected month
      const date = new Date(year, selectedMonth + 1, 0);
      totalDays = date.getDate();
    }

    // Generate the days of the month (1 through totalDays)
    let calendarDays = [];
    for (let day = 1; day <= totalDays; day++) {
      calendarDays.push(day);
    }

    // Fill the remaining spaces to complete the week if needed
    while (calendarDays.length % 7 !== 0) {
      calendarDays.push(null);
    }

    return calendarDays;
  };

  const calendarDays = generateCalendar();

  // Add event handler
  const handleAddEvent = () => {
    if (!newEvent.name || !newEvent.time) {
      alert('Please provide event name and time');
      return;
    }

    const event = { ...newEvent, date: selectedDate };
    setEvents([...events, event]);

    // Clear input fields
    setNewEvent({
      name: '',
      time: '',
      notes: '',
      date: selectedDate,
    });
  };

  return (
    <>
  
  <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <HashLink
          smooth 
          to="/#"
          className="flex items-center gap-2"
        >
          <BookOpen className="h-6 w-6" />
          <span className="text-xl font-bold">Study Buddy</span>
        </HashLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <HashLink
            smooth
            to="/#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </HashLink>
          <HashLink
            smooth
            to="/#features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </HashLink>
          <HashLink
            smooth
            to="/#how-it-works"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            How It Works
          </HashLink>
          <HashLink
            smooth
            to="/#testimonials"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Testimonials
          </HashLink>
          <HashLink
            smooth
            to="/about#"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About Us
          </HashLink>
        </nav>

        <div className="flex items-center gap-4">
          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:hidden" />
                <Moon className="h-[1.2rem] w-[1.2rem] transition-all hidden dark:block" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="mt-3">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          
            <>
              

              {/* Mobile Hamburger Menu */}
              <Button
                variant="outline"
                size="icon"
                className="md:hidden"
                onClick={() => setIsDrawerOpen(true)}
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </>
        </div>
      </div>

      {/* Side Navigation Drawer for Mobile */}
      <Drawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        side="left"
        title="Navigation Menu"
        description="Main navigation links for the site"
      >
        <div className="flex flex-col h-full p-4">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsDrawerOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="flex flex-col">
            {[
              { to: "/", label: "Home" },
              { to: "/", label: "Features" },
              { to: "/", label: "How It Works" },
              { to: "/", label: "Testimonials" },
              { to: "/", label: "About Us" },
            ].map((item) => (
              <HashLink
                key={item.to}
                smooth
                to={item.to}
                className="py-3 px-4 text-lg font-medium hover:bg-accent  rounded-sm "
                onClick={() => setIsDrawerOpen(false)}
              >
                {item.label}
              </HashLink>
            ))}
          </div>
          <div className="mt-auto pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Study Buddy. All rights reserved.
          </div>
        </div>
      </Drawer>
    </header>
  
       
    <div style={{
      maxWidth: '400px',
      margin: '40',
      padding: '100px 20px 20px',
      borderRadius: '8px',
      backgroundColor: 'white',
      boxShadow: '100 4px 6px rgba(0, 0, 0, 0.1)',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
      }}>
        <button onClick={handlePrevMonth} style={{
          fontSize: '18px',
          backgroundColor: '#f3f4f6',
          padding: '5px 10px',
          borderRadius: '5px',
          width: '40px',
          height: '40px',
        }}>
          &lt;
        </button>
        <h2>{monthNames[selectedMonth]} {year}</h2>
        <button onClick={handleNextMonth} style={{
          fontSize: '18px',
          backgroundColor: '#f3f4f6',
          padding: '5px 10px',
          borderRadius: '5px',
          width: '40px',
          height: '40px',
        }}>
          &gt;
        </button>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px',
      }}>
        <button onClick={handleToday} style={{
          backgroundColor: 'Darkblue',
          color: 'white',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '14px',
        
        }}>
          Today
        </button>
        <button onClick={handleAddEvent} style={{
          backgroundColor: 'darkblue',
          color: 'white',
          padding: '5px 5px',
          borderRadius: '5px',
          fontSize: '14px',
          
        }}>
          Add Event
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '5px',
        textAlign: 'center',
      }}>
        {daysOfWeek.map((day) => (
          <div key={day} style={{ fontWeight: 'bold' }}>{day}</div>
        ))}
        {calendarDays.map((day, index) => (
          <div key={index} style={{
            padding: '10px',
            backgroundColor: day ? '#f9fafb' : 'transparent',
            color: day ? '#1e293b' : 'transparent',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease',
            ...(day && day === selectedDate ? { backgroundColor: '#d1d5db' } : {}),
          }} onClick={() => day && setSelectedDate(day)}>
            {day}
          </div>
        ))}
      </div>

      {/* Event Form */}
      <div style={{ marginTop: '20px' }}>
        <h3>Schedule Event</h3>
        <div>
          <label>Event Name</label>
          <input
            type="text"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
            placeholder="Event Name"
            style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px' }}
          />
        </div>
        <div>
          <label>Event Time</label>
          <input
            type="time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px' }}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            value={newEvent.notes}
            onChange={(e) => setNewEvent({ ...newEvent, notes: e.target.value })}
            placeholder="Add notes"
            rows="4"
            style={{ width: '100%', padding: '8px', margin: '5px 0', borderRadius: '5px' }}
          />
        </div>
        <div style={{
          marginTop: '10px',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <button onClick={handleAddEvent} style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '5px',
            fontSize: '14px',
          }}>
            Save Event
          </button>
        </div>
      </div>

      {/* Display events below calendar */}
      <div style={{ marginTop: '20px' }}>
        <h3>Scheduled Events</h3>
        {events.filter((event) => event.date === selectedDate).map((event, index) => (
          <div key={index} style={{
            backgroundColor: '#f3f4f6',
            padding: '10px',
            borderRadius: '5px',
            marginBottom: '10px',
          }}>
            <h4>{event.name}</h4>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Notes:</strong> {event.notes}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};
export default ContinuousCalendar;
