import { WeatherApp } from './components/WeatherApp';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[390px] h-[844px] bg-black rounded-[60px] p-2 shadow-2xl">
        <div className="w-full h-full bg-white rounded-[50px] overflow-hidden">
          <WeatherApp />
        </div>
      </div>
    </div>
  );
}