# 🌦️ Weather App

An interactive application for viewing current weather and a 5‑day forecast with handy search, charts, and the ability to save favorite cities.

---

## 🚀 Features

- 🔍 City weather search with autocomplete  
- 🌤️ Current weather: temperature, “feels like,” wind, description  
- 📅 5‑day forecast with a temperature chart  
- ⭐ Saving favorite cities (locally, with persistence)  
- 🌇 Hourly temperature chart with icons  
- 🌓 Weather‑based backgrounds  
- ⚡ Data caching with auto‑cleanup (TTL)  
- 🧠 Zustand + TypeScript for state management  
- 💅 Bootstrap + SCSS Modules for responsive styling  

---

## 🧰 Technologies Used

- **Next.js 14 (App Router)**  
- **TypeScript**  
- **Zustand** — state management  
- **SCSS Modules** — component styling  
- **Bootstrap 5** — responsive UI  
- **Recharts** — temperature charts  
- **OpenWeatherMap API** — weather data source  
- **Axios** — HTTP requests  
- **Persist** — saving state to localStorage  

---

## Installation

1. Install dependencies:  
   npm install

2. Create a .env.local file with your API key:
	NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
3. Start the development server:
	npm run dev

🚧 Running with Mock Data
If you don’t have your own API key, you can use mock data instead:

2. Create a .env.local file:
	NEXT_PUBLIC_USE_MOCK=true
	
3. Start the development server:
	npm run dev


# 🌦️ Weather App

Интерактивное приложение для просмотра текущей погоды и прогноза на 5 дней вперёд с удобным поиском, графиками и возможностью сохранять избранные города.

---

## 🚀 Возможности

- 🔍 Поиск погоды по названию города с автоподсказками
- 🌤️ Текущая погода: температура, ощущается как, ветер, описание
- 📅 Прогноз на 5 дней с температурным графиком
- ⭐ Сохранение избранных городов (локально, с персистом)
- 🌇 График температуры по часам с иконками 
- 🌓 Фоны по погоде
- ⚡ Кэширование данных с автоочисткой по TTL
- 🧠 Zustand + TypeScript для управления состоянием
- 💅 Bootstrap + SCSS Modules для адаптивной вёрстки

---

## 🧰 Используемые технологии

- **Next.js 14 (App Router)**
- **TypeScript**
- **Zustand** — управление состоянием
- **SCSS Modules** — стилизация компонентов
- **Bootstrap 5** — адаптивный UI
- **Recharts** — графики температуры
- **OpenWeatherMap API** — источник данных о погоде
- **Axios** — HTTP-запросы
- **Persist** — сохранение состояния в localStorage

## Установка

1. Установи зависимости:

npm install

2. Создай .env.local файл:
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here

3. Запусти приложение:

npm run dev


Если нет своего ключа, то можно запустить с мок-данными

2. Создай .env.local файл:

NEXT_PUBLIC_USE_MOCK=true

3. Запусти приложение:

npm run dev
