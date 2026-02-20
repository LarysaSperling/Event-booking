import React, { useState } from "react";
import EventBooking from "./components/eventBooking";
import "./App.css";

function buildEventsData() {
  return [

  {
    id: 237632,
    date: new Date("2026-03-21"),
    events: [
      {
        id: 7843687,
        title: "Gorvin Show",
        seats: Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          label: `${Math.floor(i / 10) + 1}${String.fromCharCode(97 + (i % 10))}`,
          isSelected: false
        }))
      },
      {
        id: 7843688,
        title: "Comedy Night",
        seats: Array.from({ length: 40 }, (_, i) => ({
          id: i + 1,
          label: `R${Math.floor(i / 8) + 1}S${(i % 8) + 1}`,
          isSelected: i % 5 === 0 
        }))
      },
      {
        id: 7843689,
        title: "Improv Show",
        seats: Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          label: `A${i + 1}`,
          isSelected: [3, 7, 12, 15, 22].includes(i + 1)
        }))
      }
    ]
  },
  {
    id: 237633,
    date: new Date("2026-03-22"),
    events: [
      {
        id: 7843690,
        title: "Rock Concert",
        seats: Array.from({ length: 100 }, (_, i) => ({
          id: i + 1,
          label: `${String.fromCharCode(65 + Math.floor(i / 20))}${(i % 20) + 1}`,
          isSelected: Math.random() > 0.7 
        }))
      },
      {
        id: 7843691,
        title: "Metal Night",
        seats: Array.from({ length: 60 }, (_, i) => ({
          id: i + 1,
          label: `M${i + 1}`,
          isSelected: false
        }))
      }
    ]
  },
  {
    id: 237634,
    date: new Date("2026-03-23"),
    events: [
      {
        id: 7843692,
        title: "Magic Show",
        seats: Array.from({ length: 45 }, (_, i) => ({
          id: i + 1,
          label: `S${i + 1}`,
          isSelected: i < 5 
        }))
      },
      {
        id: 7843693,
        title: "Illusionist",
        seats: Array.from({ length: 35 }, (_, i) => ({
          id: i + 1,
          label: `VIP${i + 1}`,
          isSelected: false
        }))
      }
    ]
  },
  {
    id: 237635,
    date: new Date("2026-03-24"),
    events: [
      {
        id: 7843694,
        title: "Jazz Evening",
        seats: Array.from({ length: 25 }, (_, i) => ({
          id: i + 1,
          label: `J${i + 1}`,
          isSelected: i % 3 === 0
        }))
      },
      {
        id: 7843695,
        title: "Blues Night",
        seats: Array.from({ length: 30 }, (_, i) => ({
          id: i + 1,
          label: `B${i + 1}`,
          isSelected: i > 20 
        }))
      },
      {
        id: 7843696,
        title: "Soul Music",
        seats: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          label: `SO${i + 1}`,
          isSelected: false
        }))
      }
    ]
  },
  {
    id: 237636,
    date: new Date("2026-03-25"),
    events: [
      {
        id: 7843697,
        title: "Dance Performance",
        seats: Array.from({ length: 80 }, (_, i) => ({
          id: i + 1,
          label: `D${Math.floor(i / 10) + 1}-${(i % 10) + 1}`,
          isSelected: i % 7 === 0
        }))
      }
    ]
  },
  {
    id: 237637,
    date: new Date("2026-03-26"),
    events: [
      {
        id: 7843698,
        title: "Theater Play",
        seats: Array.from({ length: 120 }, (_, i) => ({
          id: i + 1,
          label: `T${Math.floor(i / 12) + 1}-${(i % 12) + 1}`,
          isSelected: false
        }))
      },
      {
        id: 7843699,
        title: "Drama",
        seats: Array.from({ length: 90 }, (_, i) => ({
          id: i + 1,
          label: `DR${i + 1}`,
          isSelected: i < 10
        }))
      }
    ]
  },
  {
    id: 237638,
    date: new Date("2026-03-27"),
    events: [
      {
        id: 7843700,
        title: "Stand-up Comedy",
        seats: Array.from({ length: 55 }, (_, i) => ({
          id: i + 1,
          label: `C${i + 1}`,
          isSelected: [1, 2, 3, 10, 15, 30, 45].includes(i + 1)
        }))
      }
    ]
  },
  {
    id: 237639,
    date: new Date("2026-03-28"),
    events: [
      {
        id: 7843701,
        title: "Opera",
        seats: Array.from({ length: 150 }, (_, i) => ({
          id: i + 1,
          label: `O${Math.floor(i / 15) + 1}-${(i % 15) + 1}`,
          isSelected: i > 140 
        }))
      }
    ]
  },
  {
    id: 237640,
    date: new Date("2026-03-29"),
    events: [
      {
        id: 7843702,
        title: "Ballet",
        seats: Array.from({ length: 85 }, (_, i) => ({
          id: i + 1,
          label: `B${i + 1}`,
          isSelected: i % 4 === 0
        }))
      },
      {
        id: 7843703,
        title: "Modern Dance",
        seats: Array.from({ length: 40 }, (_, i) => ({
          id: i + 1,
          label: `MD${i + 1}`,
          isSelected: false
        }))
      }
    ]
  },
  {
    id: 237641,
    date: new Date("2026-03-30"),
    events: [
      {
        id: 7843704,
        title: "Kids Show",
        seats: Array.from({ length: 70 }, (_, i) => ({
          id: i + 1,
          label: `K${Math.floor(i / 14) + 1}-${(i % 14) + 1}`,
          isSelected: i < 20
        }))
      }
    ]
  },
  {
    id: 237642,
    date: new Date("2026-03-31"),
    events: [
      {
        id: 7843705,
        title: "New Year Party",
        seats: Array.from({ length: 200 }, (_, i) => ({
          id: i + 1,
          label: `NY${Math.floor(i / 20) + 1}-${(i % 20) + 1}`,
          isSelected: i % 2 === 0 
        }))
      }
    ]
  },
  

  {
    id: 237643,
    date: new Date("2026-04-01"),
    events: [
      {
        id: 7843706,
        title: "April Fools Show",
        seats: Array.from({ length: 50 }, (_, i) => ({
          id: i + 1,
          label: `AF${i + 1}`,
          isSelected: false
        }))
      }
    ]
  },
  {
    id: 237644,
    date: new Date("2026-04-02"),
    events: [
      {
        id: 7843707,
        title: "Rock Festival",
        seats: Array.from({ length: 300 }, (_, i) => ({
          id: i + 1,
          label: `RF${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
          isSelected: Math.random() > 0.5
        }))
      }
    ]
  },
  {
    id: 237645,
    date: new Date("2026-04-03"),
    events: [
      {
        id: 7843708,
        title: "Hip-Hop Night",
        seats: Array.from({ length: 75 }, (_, i) => ({
          id: i + 1,
          label: `HH${i + 1}`,
          isSelected: i % 6 === 0
        }))
      },
      {
        id: 7843709,
        title: "R&B Concert",
        seats: Array.from({ length: 65 }, (_, i) => ({
          id: i + 1,
          label: `RB${i + 1}`,
          isSelected: i > 50
        }))
      }
    ]
  }
];
}

export default function App() {
  
  const [eventsData] = useState(() => buildEventsData());

  return (
    <div className="app">
      <EventBooking eventsData={eventsData} />
    </div>
  );
}




// 1.	Создание нового React проекта

// Откройте терминал и создайте новый проект React с помощью Create React App, используя команду npx create-react-app имя-проекта.

// Перейдите в директорию проекта cd имя-проекта.

// 2.	Настройка Eslint

// Инициализируйте ESLint в проекте, чтобы создать конфигурационный файл .eslint.config.mjs . В терминале выполните: npx eslint --init

// 3.	Создание структуры проекта

// Внутри папки src, создайте подпапку components, где будут храниться все компоненты приложения.

// В папке components создайте файлы для каждого компонента: EventDetails.js, SeatSelector.js и EventBooking.js.

// 4.	Разработка компонентов

// EventDetails компонент: Этот компонент отвечает за отображение информации о событии, такой как название, дата и место проведения.
   
// SeatSelector компонент: Разработайте компонент для выбора мест. Компонент должен позволять пользователю выбирать места из списка доступных мест.

// EventBooking компонент: Это родительский компонент, который будет интегрировать EventDetails и SeatSelector. Управляет состоянием выбранных мест и передает нужные данные дочерним компонентам.

// 5.	Интеграция компонентов

// Интегрируйте компоненты в App.js, который является главным компонентом приложения.

// Убедитесь, что компоненты правильно принимают props и обрабатывают состояния.

// 6.	Добавление стилей

// Добавьте стили для компонентов при помощи CSS.

// 7.	Тестирование приложения

// Запустите приложение с помощью команды npm start.

// Проверьте работу интерфейса: добавление мест, их выбор и удаление, а также корректность отображения информации о событии.

// 8.	Оптимизация и отладка

// Используйте React Dev Tools для мониторинга и отладки состояний и ререндеров компонентов.

// Устраните возможные проблемы производительности и ошибки в логике приложения.

// Убедитесь, что Eslint не находит ошибок в коде.

// Создание структуры проекта

// Внутри папки src, создайте подпапку components, где будут храниться все компоненты приложения.

// В папке components создайте файлы для каждого компонента: EventDetails.js, SeatSelector.js и EventBooking.js.

// Разработка компонентов

// EventDetails компонент: Этот компонент отвечает за отображение информации о событии, такой как название, дата и место проведения. Пользователь может выбрать любую дату (DataSelector), а затем и мероприятия, которые проходят в эту дату.
   
// SeatSelector компонент: Разработайте компонент для выбора мест. Компонент должен позволять пользователю выбирать места из списка доступных мест.

// EventBooking компонент: Это родительский компонент, который будет интегрировать EventDetails и SeatSelector. Управляет состоянием выбранных мест и передает нужные данные дочерним компонентам.

// Интеграция компонентов

// Интегрируйте компоненты в App.js, который является главным компонентом приложения.