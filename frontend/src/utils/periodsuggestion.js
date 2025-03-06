// src/utils/periodSuggestions.js
export const getPeriodSuggestions = (periodIntensity, crampsLevel) => {
    let exerciseSuggestion = "";
    let dietSuggestion = "";
  
    if (periodIntensity === "High" && crampsLevel === "High") {
      exerciseSuggestion =
        "Your body is signaling a need for extra care. Focus on restorative activities like gentle yoga (child's pose, supine twist), deep breathing, and a slow-paced walk in a calm environment. Avoid strenuous activities and opt for relaxation techniques such as meditation.";
      dietSuggestion =
        "Emphasize anti-inflammatory foods: warm broths, soups, and smoothies with ingredients like ginger, turmeric, and leafy greens. Stay well-hydrated with herbal teas (chamomile or peppermint) and water, and avoid processed foods and excessive caffeine.";
    } else if (periodIntensity === "High" && crampsLevel === "Medium") {
      exerciseSuggestion =
        "With high flow and moderate cramps, stick to very gentle movements. Consider light stretching, restorative yoga, or a leisurely walk. Incorporate deep breathing exercises to help reduce discomfort.";
      dietSuggestion =
        "Opt for easily digestible meals: try warm, soft foods such as steamed vegetables, porridge, or light soups. Include anti-inflammatory ingredients and focus on staying hydrated with water and herbal teas.";
    } else if (periodIntensity === "High" && crampsLevel === "Low") {
      exerciseSuggestion =
        "Even though your cramps are lower, high flow calls for caution. Engage in gentle exercises such as slow yoga or a relaxed walk, and consider incorporating mindfulness practices to ease any discomfort.";
      dietSuggestion =
        "Choose warm and soothing foods, like broths, smoothies, and steamed vegetables. Focus on hydration and include nutrient-dense ingredients like berries and leafy greens to support your energy.";
    } else if (periodIntensity === "Medium" && crampsLevel === "High") {
      exerciseSuggestion =
        "When your cramps are high despite a moderate flow, prioritize gentle movement. Try a slow-paced walk, gentle stretching, or restorative yoga poses that focus on releasing tension in your lower back and abdomen.";
      dietSuggestion =
        "Include anti-inflammatory foods and consider small, frequent meals. Lean proteins, whole grains, and plenty of fruits and vegetables can help stabilize your energy levels. Herbal teas like ginger or chamomile can be especially soothing.";
    } else if (periodIntensity === "Medium" && crampsLevel === "Medium") {
      exerciseSuggestion =
        "Moderate activities like brisk walking, light cycling, or a moderate yoga session can help alleviate discomfort while keeping you active. Always listen to your body and take breaks as needed.";
      dietSuggestion =
        "Maintain a balanced diet with lean proteins, whole grains, and colorful fruits and vegetables. Incorporate magnesium-rich foods (e.g., spinach, almonds) and keep your hydration levels high.";
    } else if (periodIntensity === "Medium" && crampsLevel === "Low") {
      exerciseSuggestion =
        "You have a good balance of flow and low cramps, so you can try a mix of light cardio and strength exercises. Ensure you warm up properly and incorporate stretching routines.";
      dietSuggestion =
        "A well-rounded diet that includes a variety of nutrient-dense foods will support your activity. Focus on whole foods like fruits, vegetables, lean meats, and whole grains, and remember to drink plenty of water.";
    } else if (periodIntensity === "Low" && crampsLevel === "High") {
      exerciseSuggestion =
        "Even with low flow, high cramps warrant a focus on gentle, calming activities. Consider restorative yoga, light stretching, or a slow-paced walk, and take time to rest and relax.";
      dietSuggestion =
        "Opt for soothing, nutrient-rich foods such as oatmeal with fruits, steamed vegetables, and lean proteins. Avoid heavy, processed meals and drink warm herbal teas to help ease discomfort.";
    } else if (periodIntensity === "Low" && crampsLevel === "Medium") {
      exerciseSuggestion =
        "With low flow and moderate cramps, you can engage in light to moderate activities such as a brisk walk, low-impact aerobics, or a gentle cycling session. Monitor your body's response and rest if needed.";
      dietSuggestion =
        "Maintain a balanced diet that includes a mix of proteins, healthy fats, and carbohydrates. Consider incorporating fiber-rich foods and staying hydrated to help manage cramps and maintain energy levels.";
    } else if (periodIntensity === "Low" && crampsLevel === "Low") {
      exerciseSuggestion =
        "If both your flow and cramps are low, you may feel energetic enough for more vigorous activities like jogging, cycling, or a gym workout. However, always listen to your body and adjust as needed.";
      dietSuggestion =
        "A varied and balanced diet is key—include lean proteins, whole grains, fresh fruits, and vegetables to fuel your active lifestyle. Ensure you get adequate hydration and nutrients to support your energy.";
    } else {
      exerciseSuggestion = "Listen to your body and choose exercises that feel comfortable for you.";
      dietSuggestion = "Maintain a balanced diet and stay well-hydrated.";
    }
  
    return { exerciseSuggestion, dietSuggestion };
  };
  