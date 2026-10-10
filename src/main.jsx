import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, CalendarDays, Check, ChevronDown, CloudRain, Compass,
  Footprints, Heart, Image as ImageIcon, MapPin, Music2, RefreshCw,
  Share2, ShoppingBag, Sparkles, Sun, Ticket, UserPlus, Users, Wallet,
  X
} from 'lucide-react';
import './styles.css';

const plans = {
  展览: {
    title: '艺术与烟火的滨江一日',
    desc: '从美术馆到市集，再到江边的落日，感受上海的文艺与生活。',
    meta: ['约 ¥128', '7.2 km', '室内外皆可'],
    stops: [
      ['10:30', '西岸美术馆｜年度建筑展', '在巨幅落地窗前，看一场关于城市未来的想象。'],
      ['14:00', '龙华会｜周末手作市集', '逛有趣的独立品牌，遇见生活灵感。'],
      ['18:30', '徐汇滨江｜落日散步', '在江边吹风，看城市被夕阳染成金色。'],
    ]
  },
  市集: {
    title: '街区寻宝与夜间市集',
    desc: '从独立小店一路逛到夜市，把周末过成一场城市寻宝。',
    meta: ['约 ¥96', '4.1 km', '轻松好逛'],
    stops: [
      ['11:00', '安福路｜独立设计店', '慢慢逛小店，发现刚刚好的周末礼物。'],
      ['15:00', '上生新所｜咖啡休息', '在梧桐树影下，和朋友聊到忘记时间。'],
      ['19:00', '愚园路｜夜间市集', '小吃、手作和音乐，把氛围感拉满。'],
    ]
  },
  演出: {
    title: '从唱片店到 Livehouse',
    desc: '用音乐串起下午和夜晚，认识一座城市的另一种节奏。',
    meta: ['约 ¥180', '5.3 km', '室内为主'],
    stops: [
      ['13:00', '黑胶唱片店｜试听一小时', '翻一张没听过的唱片，交换彼此的歌单。'],
      ['16:30', '陕西南路｜晚餐补给', '演出前吃一顿热乎的，顺便认识新搭子。'],
      ['19:30', 'MAO Livehouse｜乐队现场', '站进人群里，把一周的疲惫留在鼓点里。'],
    ]
  },
  徒步: {
    title: '佘山森林的轻徒步',
    desc: '离开高楼半天，在林间小路和山顶视野里重新充电。',
    meta: ['约 ¥50', '9.6 km', '户外为主'],
    stops: [
      ['09:00', '佘山地铁站｜集合出发', '便利店补给，和新队友互相认识。'],
      ['10:30', '东佘山｜林间徒步', '沿缓坡穿过竹林，适合新手的轻量路线。'],
      ['15:30', '山脚草坪｜野餐返程', '晒会儿太阳，分享各自带来的零食。'],
    ]
  }
};

const inspirations = [
  { title: '梧桐漫游｜老建筑与咖啡的一天', desc: '从武康路出发，走进老洋房与独立咖啡馆。', meta: '约 ¥96 · 4.1 km · 室外为主', color: '#e8f1dc' },
  { title: '夜晚躁动｜Livehouse 音乐之旅', desc: '从下午的唱片店到晚上的现场演出。', meta: '约 ¥180 · 5.3 km · 室内为主', color: '#dfe8ff' },
  { title: '佘山徒步｜森林与城市的切换', desc: '半天徒步，俯瞰上海天际线。', meta: '约 ¥50 · 9.6 km · 户外为主', color: '#d8eadf' },
];

function Avatar({ label, tone }) {
  return <span className="avatar" style={{ background: tone }} aria-label={label}>{label.slice(-1)}</span>;
}

function Header({ active, setActive }) {
  return <header className="topbar">
    <button className="brand" onClick={() => setActive('发现')}>周末搭子<span>.</span></button>
    <button className="city">上海 <ChevronDown size={16}/></button>
    <nav>{['发现','组队','打卡','攻略'].map(item =>
      <button key={item} onClick={() => setActive(item)} className={active === item ? 'active' : ''}>{item}</button>
    )}</nav>
    <button className="profile"><Avatar label="小橙" tone="#ffb089"/><span>小橙</span><ChevronDown size={15}/></button>
  </header>;
}

function PreferenceBar({ interest, setInterest, budget, setBudget, people, setPeople, onGenerate, loading }) {
  const icons = { 展览: ImageIcon, 市集: ShoppingBag, 演出: Music2, 徒步: Footprints };
  return <section className="preference-bar" aria-label="探索偏好">
    <div className="weather-days">
      <button className="weather selected"><Sun size={22}/><span>周六 <b>24°</b> 晴</span><Check size={13}/></button>
      <button className="weather"><CloudRain size={22}/><span>周日 <b>20°</b> 小雨</span></button>
    </div>
    <label className="select-control"><Wallet size={19}/><select value={budget} onChange={e=>setBudget(e.target.value)}><option>¥ 0–100</option><option>¥ 0–200</option><option>¥ 200–400</option></select><ChevronDown size={16}/></label>
    <label className="select-control"><Users size={19}/><select value={people} onChange={e=>setPeople(e.target.value)}><option>1人独行</option><option>2–4人</option><option>5人以上</option></select><ChevronDown size={16}/></label>
    <div className="interests">{Object.entries(icons).map(([name, Icon])=><button key={name} className={interest===name?'selected':''} onClick={()=>setInterest(name)}><Icon size={18}/>{name}</button>)}</div>
    <button className="generate" onClick={onGenerate} disabled={loading}>{loading?<RefreshCw size={18} className="spin"/>:<Sparkles size={18}/>} {loading?'正在安排':'帮我安排'}<ArrowRight size={18}/></button>
  </section>;
}

function Itinerary({ plan, saved, setSaved }) {
  return <article className="itinerary">
    <div className="plan-copy">
      <div className="plan-head"><div><p className="route-label">周六 · 推荐路线</p><h2>{plan.title}</h2></div><button className={`heart ${saved?'saved':''}`} onClick={()=>setSaved(!saved)} aria-label="收藏路线"><Heart size={21} fill={saved?'currentColor':'none'}/></button></div>
      <p className="plan-desc">{plan.desc}</p>
      <ol className="timeline">{plan.stops.map(([time,title,desc])=><li key={time}><time>{time}</time><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol>
      <div className="plan-meta"><Ticket size={18}/><span>{plan.meta[0]}</span><i/> <MapPin size={18}/><span>{plan.meta[1]}</span><i/><Sun size={18}/><span>{plan.meta[2]}</span></div>
    </div>
    <div className="hero-photo"><img src="./explore-hero.png" alt="四位大学生在上海滨江艺术区结伴出游"/><div className="photo-note"><MapPin size={15}/> 徐汇滨江</div></div>
  </article>;
}

function TeamPanel({ joined, onJoin }) {
  return <aside className="team-panel"><div><h2>一起出发</h2><p>同校的朋友，周末一起认识城市。</p></div><div className="avatar-stack"><Avatar label="阿杰" tone="#ffd37e"/><Avatar label="可可" tone="#a9d6ff"/><Avatar label="林墨" tone="#b8e4c1"/><span className="avatar add">+</span></div><div className="team-status"><strong>{joined?'队伍已满员':'还差 1 人'}</strong><span>{joined?'周六 10:00 集合，记得准时':'3 位同学已确认出发'}</span></div><button className={joined?'joined':''} onClick={onJoin}>{joined?<><Check size={18}/> 已加入队伍</>:<><UserPlus size={18}/> 加入队伍</>}</button></aside>;
}

function Discover({ toast, setToast }) {
  const [interest, setInterest] = useState('展览');
  const [budget, setBudget] = useState('¥ 0–200');
  const [people, setPeople] = useState('2–4人');
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState([false,false,false]);
  const plan = plans[interest];
  function generate(){setLoading(true);setTimeout(()=>{setLoading(false);setToast(`已按「${interest} · ${budget} · ${people}」重新安排路线`);},700)}
  function join(){setJoined(!joined);setToast(joined?'已退出这支队伍':'加入成功！出发前可在「组队」页联系大家')}
  return <>
    <main>
      <section className="intro"><div><h1>这周末，出去走走</h1><Sun className="sun-doodle" size={48}/></div><p>按你的天气、预算和心情，挑好一条刚刚好的路线。</p></section>
      <PreferenceBar {...{interest,setInterest,budget,setBudget,people,setPeople,onGenerate:generate,loading}}/>
      <div className="primary-grid"><Itinerary plan={plan} saved={saved} setSaved={setSaved}/><TeamPanel joined={joined} onJoin={join}/></div>
      <section className="inspiration"><div className="section-title"><h2>灵感候选</h2><button>换一批 <RefreshCw size={15}/></button></div>{inspirations.map((item,i)=><article className="inspiration-row" key={item.title}><div className="thumb" style={{background:item.color}}><Compass size={25}/><span>{String(i+1).padStart(2,'0')}</span></div><div className="inspiration-copy"><h3>{item.title}</h3><p>{item.desc}</p></div><p className="row-meta"><MapPin size={16}/>{item.meta}</p><div className="collectors"><span className="mini-faces"><i/><i/><i/></span>同校 12 人收藏</div><button className={`row-heart ${likes[i]?'saved':''}`} onClick={()=>setLikes(v=>v.map((x,j)=>j===i?!x:x))}><Heart size={21} fill={likes[i]?'currentColor':'none'}/></button></article>)}</section>
    </main>
    <footer><strong>周末搭子.</strong><span>不必去远方，附近就有新鲜事。</span><button onClick={()=>navigator.clipboard?.writeText(location.href).then(()=>setToast('链接已复制'))}><Share2 size={16}/> 分享给朋友</button></footer>
  </>;
}

function PlaceholderPage({ type, setToast }) {
  const data = {
    组队: ['找到同频的出发搭子','根据路线、学校与出发时间匹配，先聊两句再决定同行。','看看附近队伍'],
    打卡: ['把周末收进口袋','照片、地点和心情会自动拼成一张属于你的城市足迹。','记录一次探索'],
    攻略: ['来自同学的真实攻略','少一点网红滤镜，多一点路线细节、预算参考和避坑提醒。','浏览本周攻略']
  }[type];
  return <main className="placeholder"><div className="placeholder-art">{type==='组队'?<Users/>:type==='打卡'?<CalendarDays/>:<Compass/>}<span>{type}</span></div><h1>{data[0]}</h1><p>{data[1]}</p><button onClick={()=>setToast(`${type}功能演示已开启`)}>{data[2]} <ArrowRight size={18}/></button><div className="coming-list">{['同校优先','隐私保护','真实评价'].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><p>{i===0?'更容易约到时间和路线都合适的人。':i===1?'公开信息由你控制，组队更安心。':'每次出发都能沉淀为下一次的参考。'}</p></div>)}</div></main>;
}

function App(){
  const [active,setActive]=useState('发现');
  const [toast,setToast]=useState('');
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)},[toast]);
  return <div className="app"><Header active={active} setActive={setActive}/>{active==='发现'?<Discover toast={toast} setToast={setToast}/>:<PlaceholderPage type={active} setToast={setToast}/>} {toast&&<div className="toast"><Check size={17}/>{toast}<button onClick={()=>setToast('')}><X size={15}/></button></div>}</div>
}

createRoot(document.getElementById('root')).render(<App/>);
