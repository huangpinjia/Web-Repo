// LanguageTranslator.js
import React, { useState } from 'react';
import './LanguageTranslator.css';

function LanguageTranslator() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [language, setLanguage] = useState('en');

  // 字典映射 (為每種語言提供翻譯)
  const dictionaries = {
    "en": {
      "你好": "Hello",
      "世界": "World",
      "早安": "Good morning",
      "再見": "Goodbye",
      "謝謝": "Thank you",
      "請問，怎麼去[地點]?": "Excuse me, how do I get to [place]?",
      "這附近有公車站/火車站嗎？": "Is there a nearby bus stop/train station?",
      "你可以在地圖上指給我看嗎？": "Can you show me on the map?",
      "我迷路了，可以幫幫我嗎？": "I'm lost. Can you help me?",
      "從這裡到那裡有多遠？": "How far is it from here?",
      "我可以在哪裡買票？": "Where can I buy a ticket?",
      "去[目的地]的票多少錢？": "How much is a ticket to [destination]?",
      "這輛公車/火車到[地點]嗎？": "Does this bus/train go to [place]?",
      "下一班公車/火車是幾點？": "What time is the next bus/train?",
      "我想叫一輛到[地點]的計程車。": "I'd like a taxi to [place], please.",
      "我可以看菜單嗎？": "Can I see the menu, please?",
      "有素食選項嗎？": "Is there a vegetarian/vegan option?",
      "我需要幫助。": "I need help.",
      "我的護照不見了。": "I've lost my passport.",
      "你可以幫我叫救護車嗎？": "Can you call an ambulance, please?",
      "我可以提早/延遲入住嗎？": "Can I check in early/late?",
      "有附早餐嗎？": "Is breakfast included?"
  },
  "es": {
      "你好": "Hola",
      "世界": "Mundo",
      "早安": "Buenos días",
      "再見": "Adiós",
      "謝謝": "Gracias",
      "請問，怎麼去[地點]?": "Disculpe, ¿cómo llego a [lugar]?",
      "這附近有公車站/火車站嗎？": "¿Hay una parada de autobús o estación de tren cerca?",
      "你可以在地圖上指給我看嗎？": "¿Puede mostrarme en el mapa?",
      "我迷路了，可以幫幫我嗎？": "Estoy perdido. ¿Puede ayudarme?",
      "從這裡到那裡有多遠？": "¿Qué tan lejos está de aquí?",
      "我可以在哪裡買票？": "¿Dónde puedo comprar un boleto?",
      "去[目的地]的票多少錢？": "¿Cuánto cuesta un boleto a [destino]?",
      "這輛公車/火車到[地點]嗎？": "¿Este autobús/tren va a [lugar]?",
      "下一班公車/火車是幾點？": "¿A qué hora pasa el próximo autobús/tren?",
      "我想叫一輛到[地點]的計程車。": "Quisiera un taxi a [lugar], por favor.",
      "我可以看菜單嗎？": "¿Puedo ver el menú, por favor?",
      "有素食選項嗎？": "¿Hay una opción vegetariana/vegana?",
      "我需要幫助。": "Necesito ayuda.",
      "我的護照不見了。": "He perdido mi pasaporte.",
      "你可以幫我叫救護車嗎？": "¿Puede llamar a una ambulancia, por favor?",
      "我可以提早/延遲入住嗎？": "¿Puedo registrarme temprano/tarde?",
      "有附早餐嗎？": "¿Incluye desayuno?"
  },
  "ja": {
      "你好": "こんにちは",
      "世界": "世界",
      "早安": "おはよう",
      "再見": "さようなら",
      "謝謝": "ありがとう",
      "請問，怎麼去[地點]?": "すみません、[場所]にはどうやって行きますか？",
      "這附近有公車站/火車站嗎？": "この近くにバス停または駅がありますか？",
      "你可以在地圖上指給我看嗎？": "地図で見せていただけますか？",
      "我迷路了，可以幫幫我嗎？": "道に迷いました。手伝ってもらえますか？",
      "從這裡到那裡有多遠？": "ここからどれくらい離れていますか？",
      "我可以在哪裡買票？": "どこで切符を買えますか？",
      "去[目的地]的票多少錢？": "[目的地]への切符はいくらですか？",
      "這輛公車/火車到[地點]嗎？": "このバス/電車は[場所]に行きますか？",
      "下一班公車/火車是幾點？": "次のバス/電車は何時ですか？",
      "我想叫一輛到[地點]的計程車。": "[場所]までタクシーをお願いしたいです。",
      "我可以看菜單嗎？": "メニューを見せていただけますか？",
      "有素食選項嗎？": "ベジタリアンやビーガンのオプションはありますか？",
      "我需要幫助。": "助けが必要です。",
      "我的護照不見了。": "パスポートをなくしました。",
      "你可以幫我叫救護車嗎？": "救急車を呼んでいただけますか？",
      "我可以提早/延遲入住嗎？": "早めに/遅れてチェックインできますか？",
      "有附早餐嗎？": "朝食は含まれていますか？"
  },
  "fr": {
      "你好": "Bonjour",
      "世界": "Monde",
      "早安": "Bonjour",
      "再見": "Au revoir",
      "謝謝": "Merci",
      "請問，怎麼去[地點]?": "Excusez-moi, comment puis-je aller à [lieu] ?",
      "這附近有公車站/火車站嗎？": "Y a-t-il un arrêt de bus ou une gare à proximité ?",
      "你可以在地圖上指給我看嗎？": "Pouvez-vous me montrer sur la carte ?",
      "我迷路了，可以幫幫我嗎？": "Je suis perdu. Pouvez-vous m'aider ?",
      "從這裡到那裡有多遠？": "À quelle distance est-ce d'ici ?",
      "我可以在哪裡買票？": "Où puis-je acheter un billet ?",
      "去[目的地]的票多少錢？": "Combien coûte un billet pour [destination] ?",
      "這輛公車/火車到[地點]嗎？": "Ce bus/train va-t-il à [lieu] ?",
      "下一班公車/火車是幾點？": "À quelle heure est le prochain bus/train ?",
      "我想叫一輛到[地點]的計程車。": "Je voudrais un taxi pour [lieu], s'il vous plaît.",
      "我可以看菜單嗎？": "Puis-je voir le menu, s'il vous plaît ?",
      "有素食選項嗎？": "Y a-t-il une option végétarienne/végane ?",
      "我需要幫助。": "J'ai besoin d'aide.",
      "我的護照不見了。": "J'ai perdu mon passeport.",
      "你可以幫我叫救護車嗎？": "Pouvez-vous appeler une ambulance, s'il vous plaît ?",
      "我可以提早/延遲入住嗎？": "Puis-je m'enregistrer tôt/tard ?",
      "有附早餐嗎？": "Le petit-déjeuner est-il inclus ?"
  }
  };

  const handleTranslate = () => {
    const selectedDictionary = dictionaries[language];
  
    // 預處理輸入文本，去掉前後空格並處理標點符號
    const sanitizedText = text.trim();
  
    // 打印出處理後的文本進行檢查
    console.log('Sanitized Input:', sanitizedText);
  
    // 嘗試查找匹配的句子
    if (selectedDictionary[sanitizedText]) {
      console.log('Matched sentence found:', sanitizedText);
      setTranslatedText(selectedDictionary[sanitizedText]);
    } else {
      console.log('No direct match found, trying word-by-word translation');
      // 如果沒有找到直接匹配，則進行單詞逐一翻譯
      const words = sanitizedText.split(" ");
      const translatedWords = words.map(word => selectedDictionary[word] || word);
      setTranslatedText(translatedWords.join(" "));
    }
  };
  
  
  
  
  

  return (
    <div className="translator-container">
      <h2>Language Translator</h2>
      <textarea
        placeholder="Enter text to translate..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="language-selector">
        <label htmlFor="language">Select language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="ja">Japanese</option>
          <option value="fr">French</option>
        </select>
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <div className="output">{translatedText}</div>
    </div>
  );
}

export default LanguageTranslator;
