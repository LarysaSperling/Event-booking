import React, { useState } from "react";
import EventBooking from "./components/eventBooking";
import "./App.css";

function d(y, m, day) {

  return new Date(y, m - 1, day);
}

function seats(count, labelFn, bookedFn = () => false) {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    label: labelFn(i),
    isBooked: bookedFn(i),
  }));
}

function bookedRule(i, mod, threshold) {
  return ((i + 1) * 17) % mod <= threshold;
}

function buildEventsData() {
  return [
    {
      id: 237632,
      date: d(2026, 3, 21),
      events: [
        {
          id: 7843687,
          title: "Gorvin Show",
          seats: seats(
            50,
            (i) => `${Math.floor(i / 10) + 1}${String.fromCharCode(97 + (i % 10))}`,
            () => false
          ),
        },
        {
          id: 7843688,
          title: "Comedy Night",
          seats: seats(40, (i) => `R${Math.floor(i / 8) + 1}S${(i % 8) + 1}`, (i) => (i + 1) % 5 === 0),
        },
        {
          id: 7843689,
          title: "Improv Show",
          seats: seats(30, (i) => `A${i + 1}`, (i) => [3, 7, 12, 15, 22].includes(i + 1)),
        },
      ],
    },
    {
      id: 237633,
      date: d(2026, 3, 22),
      events: [
        {
          id: 7843690,
          title: "Rock Concert",
          seats: seats(
            100,
            (i) => `${String.fromCharCode(65 + Math.floor(i / 20))}${(i % 20) + 1}`,
            (i) => bookedRule(i, 10, 2) // ~30%
          ),
        },
        {
          id: 7843691,
          title: "Metal Night",
          seats: seats(60, (i) => `M${i + 1}`, () => false),
        },
      ],
    },
    {
      id: 237634,
      date: d(2026, 3, 23),
      events: [
        {
          id: 7843692,
          title: "Magic Show",
          seats: seats(45, (i) => `S${i + 1}`, (i) => i < 5),
        },
        {
          id: 7843693,
          title: "Illusionist",
          seats: seats(35, (i) => `VIP${i + 1}`, () => false),
        },
      ],
    },
    {
      id: 237635,
      date: d(2026, 3, 24),
      events: [
        {
          id: 7843694,
          title: "Jazz Evening",
          seats: seats(25, (i) => `J${i + 1}`, (i) => i % 3 === 0),
        },
        {
          id: 7843695,
          title: "Blues Night",
          seats: seats(30, (i) => `B${i + 1}`, (i) => i > 20),
        },
        {
          id: 7843696,
          title: "Soul Music",
          seats: seats(20, (i) => `SO${i + 1}`, () => false),
        },
      ],
    },
    {
      id: 237636,
      date: d(2026, 3, 25),
      events: [
        {
          id: 7843697,
          title: "Dance Performance",
          seats: seats(80, (i) => `D${Math.floor(i / 10) + 1}-${(i % 10) + 1}`, (i) => i % 7 === 0),
        },
      ],
    },
    {
      id: 237637,
      date: d(2026, 3, 26),
      events: [
        {
          id: 7843698,
          title: "Theater Play",
          seats: seats(120, (i) => `T${Math.floor(i / 12) + 1}-${(i % 12) + 1}`, () => false),
        },
        {
          id: 7843699,
          title: "Drama",
          seats: seats(90, (i) => `DR${i + 1}`, (i) => i < 10),
        },
      ],
    },
    {
      id: 237638,
      date: d(2026, 3, 27),
      events: [
        {
          id: 7843700,
          title: "Stand-up Comedy",
          seats: seats(55, (i) => `C${i + 1}`, (i) => [1, 2, 3, 10, 15, 30, 45].includes(i + 1)),
        },
      ],
    },
    {
      id: 237639,
      date: d(2026, 3, 28),
      events: [
        {
          id: 7843701,
          title: "Opera",
          seats: seats(150, (i) => `O${Math.floor(i / 15) + 1}-${(i % 15) + 1}`, (i) => i > 140),
        },
      ],
    },
    {
      id: 237640,
      date: d(2026, 3, 29),
      events: [
        {
          id: 7843702,
          title: "Ballet",
          seats: seats(85, (i) => `B${i + 1}`, (i) => i % 4 === 0),
        },
        {
          id: 7843703,
          title: "Modern Dance",
          seats: seats(40, (i) => `MD${i + 1}`, () => false),
        },
      ],
    },
    {
      id: 237641,
      date: d(2026, 3, 30),
      events: [
        {
          id: 7843704,
          title: "Kids Show",
          seats: seats(70, (i) => `K${Math.floor(i / 14) + 1}-${(i % 14) + 1}`, (i) => i < 20),
        },
      ],
    },
    {
      id: 237642,
      date: d(2026, 3, 31),
      events: [
        {
          id: 7843705,
          title: "New Year Party",
          seats: seats(200, (i) => `NY${Math.floor(i / 20) + 1}-${(i % 20) + 1}`, (i) => (i + 1) % 2 === 0),
        },
      ],
    },
    {
      id: 237643,
      date: d(2026, 4, 1),
      events: [
        {
          id: 7843706,
          title: "April Fools Show",
          seats: seats(50, (i) => `AF${i + 1}`, () => false),
        },
      ],
    },
    {
      id: 237644,
      date: d(2026, 4, 2),
      events: [
        {
          id: 7843707,
          title: "Rock Festival",
          seats: seats(300, (i) => `RF${Math.floor(i / 30) + 1}-${(i % 30) + 1}`, (i) => bookedRule(i, 10, 4)), // ~50%
        },
      ],
    },
    {
      id: 237645,
      date: d(2026, 4, 3),
      events: [
        {
          id: 7843708,
          title: "Hip-Hop Night",
          seats: seats(75, (i) => `HH${i + 1}`, (i) => i % 6 === 0),
        },
        {
          id: 7843709,
          title: "R&B Concert",
          seats: seats(65, (i) => `RB${i + 1}`, (i) => i > 50),
        },
      ],
    },
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