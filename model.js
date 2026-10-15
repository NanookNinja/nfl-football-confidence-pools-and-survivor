(function(root){
'use strict';
const sum=a=>a.reduce((s,v)=>s+v,0);
const prob=ml=>ml<0?-ml/(100-ml):100/(ml+100);
function noVig(a,b){if(!Number.isFinite(a)||!Number.isFinite(b)||Math.abs(a)<100||Math.abs(b)<100)throw Error('Use valid American odds, such as -140 and +120.');return prob(a)/(prob(a)+prob(b));}
function ranks(rows,through=18){const result=rows.map(r=>({...r,total:sum(r.weeks.slice(0,through).filter(Number.isFinite))})).sort((a,b)=>b.total-a.total||a.name.localeCompare(b.name));return result.map(r=>({...r,rank:1+result.filter(x=>x.total>r.total).length}));}
function draft(slate){return slate.map(g=>({id:g.id,pick:g.pA>=.5?g.a:g.b,p:g.pA>=.5?g.pA:1-g.pA})).sort((a,b)=>a.p-b.p||a.id.localeCompare(b.id)).map((r,i)=>({...r,confidence:i+1}));}
function validate(slate,picks){if(picks.length!==slate.length)return 'Choose every game.';const ids=new Set();const weights=new Set();for(const p of picks){const g=slate.find(g=>g.id===p.id);if(!g||ids.has(p.id)||![g.a,g.b].includes(p.pick))return 'Every matchup needs one valid pick.';ids.add(p.id);if(!Number.isInteger(p.confidence)||p.confidence<1||p.confidence>slate.length||weights.has(p.confidence))return `Use every confidence number from 1 to ${slate.length} exactly once.`;weights.add(p.confidence);}return '';}
function expected(slate,picks){return sum(picks.map(p=>{const g=slate.find(g=>g.id===p.id);return (p.pick===g.a?g.pA:1-g.pA)*p.confidence;}));}
function compare(history,opponent,week){const name=opponent==='Rich'?'Rick':opponent;const mine=history.filter(p=>p.name==='Tim'&&(!week||p.week===week));return mine.map(m=>{const o=history.find(p=>p.name===name&&p.week===m.week&&p.teamA===m.teamA&&p.teamB===m.teamB);return {...m,opponent:o||null,swing:o?m.earned-o.earned:null};});}
function emailDraft(slate,picks,week,tiebreaker,survivorText=''){
 const error=validate(slate,picks);if(error)throw Error(error);
 if(!Number.isInteger(week)||week<1||week>18)throw Error('Choose a valid NFL week.');
 if(!Number.isInteger(tiebreaker)||tiebreaker<0||tiebreaker>200)throw Error('Enter a tiebreaker total from 0 to 200 before preparing the email.');
 const lines=['Hi Brian,','',`Here are my Week ${week} picks.`,''];let day='';
 for(const game of slate){if(game.day!==day){day=game.day;lines.push(day);}
 const pick=picks.find(p=>p.id===game.id);lines.push(`${game.matchup}: ${pick.pick} — ${pick.confidence} points`);}
 lines.push('',`Tiebreaker total: ${tiebreaker}`);if(survivorText)lines.push(survivorText);lines.push('','Thanks,','Tim');
 return {to:'grafs2006@yahoo.com',subject:`TIM'S PICKS WEEK ${week}!`,body:lines.join('\n')};
}
root.Pool={sum,noVig,ranks,draft,validate,expected,compare,emailDraft};
})(typeof globalThis!=='undefined'?globalThis:this);
