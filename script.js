document.getElementById('calculatorForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Получаем значения из формы
  const age = Number(document.getElementById('age').value);
  const weight = Number(document.getElementById('weight').value);
  const height = Number(document.getElementById('height').value);
  const gender = document.getElementById('gender').value;
  const activity = Number(document.getElementById('activity').value);
  const goal = document.getElementById('goal').value;
  const region = document.getElementById('region').value;
  
  // Расчет BMR по формуле Миффлина-Сан Жеора
  let bmr = (gender === 'male') 
    ? (10 * weight) + (6.25 * height) - (5 * age) + 5 
    : (10 * weight) + (6.25 * height) - (5 * age) - 161;
  
  let dailyCalories = bmr * activity;
  if (goal === 'lose') {
    dailyCalories -= 500;
  } else if (goal === 'gain') {
    dailyCalories += 500;
  }
  
  // Обновленный расчет макронутриентов:
  let protein, fats, carbs;
  if (goal === 'gain') {
    protein = weight * 2.2;
    fats = (dailyCalories * 0.20) / 9;
  } else if (goal === 'lose') {
    protein = weight * 2.0;
    fats = (dailyCalories * 0.25) / 9;
  } else { // maintain
    protein = weight * 1.8;
    fats = (dailyCalories * 0.25) / 9;
  }
  carbs = (dailyCalories - (protein * 4 + fats * 9)) / 4;
  
  // Вывод результатов
  document.getElementById('result').innerHTML = `
    <h2>Результаты:</h2>
    <p>Дневная норма калорий: <strong>${Math.round(dailyCalories)}</strong> ккал</p>
    <p>Белки: <strong>${Math.round(protein)}</strong> г</p>
    <p>Жиры: <strong>${Math.round(fats)}</strong> г</p>
    <p>Углеводы: <strong>${Math.round(carbs)}</strong> г</p>
  `;
  
  // Отображаем блок с советами
  displayAdvice(goal);
  
  // Если цель — набор массы, показываем слайдер с продуктами
  if (goal === 'gain') {
    displayCaloriePlan(Math.round(dailyCalories), region);
  } else {
    document.getElementById('caloriePlan').innerHTML = "";
  }
  
  // Показываем секцию вывода (она была скрыта по умолчанию)
  document.querySelector('.output-section').style.display = 'block';
});
