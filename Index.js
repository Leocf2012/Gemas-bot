const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 10000;
const TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;
async function send(msg){
  try{
    await axios.get(`https://api.telegram.org/bot${TOKEN}/sendMessage`,{
      params:{chat_id:CHAT_ID,text:msg,parse_mode:'Markdown'}
    });
  }catch(e){console.log(e.message)}
}
async function check(){
  try{
    const r = await axios.get('https://api.dexscreener.com/token-profiles/latest/v1');
    const list = (r.data||[]).filter(x=>x.chainId==='solana').slice(0,3);
    for(const t of list){
      const ca = t.tokenAddress;
      const msg = `💎 *GEMA V18 - NUVEM 24H* 💎\n\n🪙 *${t.name}* ($${t.symbol})\n📜 CA: \`${ca}\`\n\n🚀 [COMPRAR NO PHOTON](https://photon-sol.tinyastro.io/en/lp/${ca})\n\n⏰ ${new Date().toLocaleString('pt-BR')}`;
      await send(msg);
      await new Promise(r=>setTimeout(r,2000));
    }
  }catch(e){console.log(e.message)}
}
app.get('/',(req,res)=>res.send('BOT ON'));
app.listen(PORT, async ()=>{
  await send('🚀 *Bot V18 ativado na nuvem!* Rodando 24h');
  setInterval(check, 30000);
  check();
});
