import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, Bookmark, CalendarDays, Check, ChevronDown, CloudRain, Compass,
  Footprints, Heart, Image as ImageIcon, MapPin, Music2, RefreshCw,
  Settings, Share2, ShoppingBag, Sparkles, Sun, Ticket, UserPlus, Users, Wallet,
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

const inspirationBatches = [
  inspirations,
  [
    { title: '运河慢行｜仓前老街与落日', desc: '沿水岸慢慢走，逛旧仓库改造的新空间。', meta: '约 ¥68 · 5.6 km · 室外为主', color: '#f8e6cf' },
    { title: '校园周边｜二手书与深夜食堂', desc: '从旧书店出发，把夜晚留给熟悉的街区。', meta: '约 ¥72 · 3.8 km · 室内外皆可', color: '#e8def8' },
    { title: '城市骑行｜一路追到晚霞', desc: '沿城市绿道轻松骑行，新手也能加入。', meta: '约 ¥45 · 12 km · 户外为主', color: '#d9edf1' },
  ]
];

const cityProfiles = {
  上海: {
    weather: { 周六: ['24°', '晴'], 周日: ['20°', '小雨'] },
    routes: {
      展览: ['艺术与烟火的滨江一日', '从美术馆到市集，再到江边的落日，感受上海的文艺与生活。', ['西岸美术馆｜年度建筑展', '龙华会｜周末手作市集', '徐汇滨江｜落日散步']],
      市集: ['街区寻宝与夜间市集', '沿着梧桐街区慢慢逛，把周末过成一场城市寻宝。', ['安福路｜独立设计店', '上生新所｜咖啡休息', '愚园路｜夜间市集']],
      演出: ['从唱片店到 Livehouse', '用音乐串起下午和夜晚，认识上海的另一种节奏。', ['黑胶唱片店｜试听一小时', '陕西南路｜晚餐补给', 'MAO Livehouse｜乐队现场']],
      徒步: ['佘山森林的轻徒步', '离开高楼半天，在林间小路和山顶视野里重新充电。', ['佘山地铁站｜集合出发', '东佘山｜林间徒步', '山脚草坪｜野餐返程']],
    }
  },
  杭州: {
    weather: { 周六: ['26°', '多云'], 周日: ['23°', '晴'] },
    routes: {
      展览: ['湖畔艺术与旧仓新生', '从当代艺术空间走到运河边，用一天看见杭州的新与旧。', ['天目里美术馆｜当代艺术展', '小河直街｜手作午后', '大运河畔｜落日散步']],
      市集: ['运河边的周末寻宝', '逛手作、喝咖啡，在老街与新店之间慢慢消磨时间。', ['小河直街｜创意小店', '桥西历史街区｜午后咖啡', '武林夜市｜晚间市集']],
      演出: ['湖城独立音乐夜', '从唱片店到小剧场，把杭州的夜晚交给现场音乐。', ['中山北路｜独立唱片店', '湖滨商圈｜晚餐补给', '酒球会｜乐队现场']],
      徒步: ['九溪烟树轻徒步', '从茶园走进溪谷，完成一条对新手友好的城市山野线。', ['九溪公交站｜集合', '九溪十八涧｜溯溪漫步', '龙井村｜茶园休息']],
    }
  },
  南京: {
    weather: { 周六: ['22°', '晴'], 周日: ['19°', '多云'] },
    routes: {
      展览: ['城墙下的艺术周末', '从博物馆到旧街区，在南京的历史纹理里寻找新鲜表达。', ['江苏省美术馆｜青年艺术展', '熙南里｜创意市集', '明城墙｜黄昏散步']],
      市集: ['老门东的烟火一天', '逛老街、吃小食，再去夜市寻找本地手作。', ['老门东｜独立手作店', '小西湖街区｜咖啡休息', '南湖夜市｜夜间寻味']],
      演出: ['梧桐树下的音乐夜', '从先锋书店出发，用一场现场演出结束周末。', ['先锋书店｜选一张唱片', '上海路｜晚餐补给', '1701 Livehouse｜乐队现场']],
      徒步: ['紫金山新手徒步线', '沿林荫缓坡登高，在城市与山野之间切换半天。', ['白马公园｜集合出发', '紫金山绿道｜林间徒步', '山顶观景台｜休息返程']],
    }
  },
  苏州: {
    weather: { 周六: ['23°', '多云'], 周日: ['21°', '小雨'] },
    routes: {
      展览: ['园林与当代艺术的一天', '从美术馆走进古城巷弄，看苏州温柔又年轻的一面。', ['苏州博物馆西馆｜特展', '双塔市集｜午后闲逛', '金鸡湖｜落日散步']],
      市集: ['古城巷弄慢慢逛', '穿过老街和菜场，在小店与市集里收集生活灵感。', ['平江路｜独立小店', '双塔市集｜午餐补给', '山塘街｜夜间漫游']],
      演出: ['水巷边的剧场夜', '把下午留给书店，把夜晚交给一场小剧场演出。', ['诚品生活｜书影音空间', '李公堤｜晚餐补给', '苏艺演艺文化集聚区｜现场演出']],
      徒步: ['天平山轻徒步', '在林间石径和山顶视野里，完成一场轻量周末逃离。', ['天平山入口｜集合', '白云古刹｜林间漫步', '观景平台｜野餐返程']],
    }
  }
};

function shiftTime(time, minutes) {
  const [hour, minute] = time.split(':').map(Number);
  const total = hour * 60 + minute + minutes;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function getPlan(city, interest, day) {
  const base = plans[interest];
  const [title, desc, stopNames] = cityProfiles[city].routes[interest];
  return {
    ...base,
    title,
    desc,
    stops: base.stops.map(([time, , stopDesc], index) => [
      shiftTime(time, day === '周日' ? 30 : 0),
      stopNames[index],
      stopDesc,
    ]),
  };
}

function Avatar({ label, tone }) {
  return <span className="avatar" style={{ background: tone }} aria-label={label}>{label.slice(-1)}</span>;
}

function Header({ active, setActive, city, setCity, setToast }) {
  const [openMenu, setOpenMenu] = useState(null);
  function navigate(item) {
    setActive(item);
    setOpenMenu(null);
  }
  return <header className="topbar">
    <button className="brand" onClick={() => navigate('发现')}>周末搭子<span>.</span></button>
    <div className="header-action">
      <button className="city" aria-expanded={openMenu === 'city'} onClick={() => setOpenMenu(value => value === 'city' ? null : 'city')}>{city} <ChevronDown size={16}/></button>
      {openMenu === 'city' ? <div className="dropdown city-menu" role="menu" aria-label="选择城市">
        <p>选择探索城市</p>
        {Object.keys(cityProfiles).map(name => <button key={name} className={city === name ? 'selected' : ''} onClick={() => { setCity(name); setOpenMenu(null); setToast(`已切换到${name}，路线与天气已更新`); }}><span>{name}</span>{city === name ? <Check size={16}/> : null}</button>)}
      </div> : null}
    </div>
    <nav>{['发现','组队','打卡','攻略'].map(item =>
      <button key={item} onClick={() => navigate(item)} className={active === item ? 'active' : ''}>{item}</button>
    )}</nav>
    <div className="header-action profile-wrap">
      <button className="profile" aria-expanded={openMenu === 'profile'} onClick={() => setOpenMenu(value => value === 'profile' ? null : 'profile')}><Avatar label="小橙" tone="#ffb089"/><span>小橙</span><ChevronDown size={15}/></button>
      {openMenu === 'profile' ? <div className="dropdown profile-menu" role="menu" aria-label="小橙的个人菜单">
        <div className="profile-summary"><Avatar label="小橙" tone="#ffb089"/><div><strong>小橙</strong><span>同济大学 · 探索者</span></div></div>
        <button onClick={() => { navigate('发现'); setToast('已打开我的收藏'); }}><Bookmark size={17}/> 我的收藏</button>
        <button onClick={() => navigate('组队')}><Users size={17}/> 我的队伍</button>
        <button onClick={() => { setOpenMenu(null); setToast('偏好设置已打开'); }}><Settings size={17}/> 偏好设置</button>
      </div> : null}
    </div>
  </header>;
}

function PreferenceBar({ city, day, setDay, interest, setInterest, budget, setBudget, people, setPeople, onGenerate, loading }) {
  const icons = { 展览: ImageIcon, 市集: ShoppingBag, 演出: Music2, 徒步: Footprints };
  const days = ['周六', '周日'];
  return <section className="preference-bar" aria-label="探索偏好">
    <div className="weather-days">
      {days.map(item => {
        const [temperature, condition] = cityProfiles[city].weather[item];
        const WeatherIcon = condition === '小雨' ? CloudRain : Sun;
        return <button key={item} className={`weather ${day === item ? 'selected' : ''}`} aria-pressed={day === item} onClick={() => setDay(item)}><WeatherIcon size={22}/><span>{item} <b>{temperature}</b> {condition}</span>{day === item ? <Check size={13}/> : null}</button>;
      })}
    </div>
    <label className="select-control"><Wallet size={19}/><select value={budget} onChange={e=>setBudget(e.target.value)}><option>¥ 0–100</option><option>¥ 0–200</option><option>¥ 200–400</option></select><ChevronDown size={16}/></label>
    <label className="select-control"><Users size={19}/><select value={people} onChange={e=>setPeople(e.target.value)}><option>1人独行</option><option>2–4人</option><option>5人以上</option></select><ChevronDown size={16}/></label>
    <div className="interests">{Object.entries(icons).map(([name, Icon])=><button key={name} className={interest===name?'selected':''} onClick={()=>setInterest(name)}><Icon size={18}/>{name}</button>)}</div>
    <button className="generate" onClick={onGenerate} disabled={loading}>{loading?<RefreshCw size={18} className="spin"/>:<Sparkles size={18}/>} {loading?'正在安排':'帮我安排'}<ArrowRight size={18}/></button>
  </section>;
}

function Itinerary({ plan, city, day, saved, onSave }) {
  return <article className="itinerary">
    <div className="plan-copy">
      <div className="plan-head"><div><p className="route-label">{day} · {city}推荐路线</p><h2>{plan.title}</h2></div><button className={`heart ${saved?'saved':''}`} onClick={onSave} aria-label={saved ? '取消收藏路线' : '收藏路线'}><Heart size={21} fill={saved?'currentColor':'none'}/></button></div>
      <p className="plan-desc">{plan.desc}</p>
      <ol className="timeline">{plan.stops.map(([time,title,desc])=><li key={time}><time>{time}</time><div><h3>{title}</h3><p>{desc}</p></div></li>)}</ol>
      <div className="plan-meta"><Ticket size={18}/><span>{plan.meta[0]}</span><i/> <MapPin size={18}/><span>{plan.meta[1]}</span><i/><Sun size={18}/><span>{plan.meta[2]}</span></div>
    </div>
    <div className="hero-photo"><img src="./explore-hero.png" alt="四位大学生结伴进行城市探索"/><div className="photo-note"><MapPin size={15}/> {city} · 同校搭子实拍</div></div>
  </article>;
}

function TeamPanel({ day, joined, onJoin }) {
  return <aside className="team-panel"><div><h2>一起出发</h2><p>同校的朋友，周末一起认识城市。</p></div><div className="avatar-stack"><Avatar label="阿杰" tone="#ffd37e"/><Avatar label="可可" tone="#a9d6ff"/><Avatar label="林墨" tone="#b8e4c1"/><button className="avatar add" onClick={onJoin} aria-label="加入这支队伍">+</button></div><div className="team-status"><strong>{joined?'队伍已满员':'还差 1 人'}</strong><span>{joined?`${day} 10:00 集合，记得准时`:'3 位同学已确认出发'}</span></div><button className={joined?'joined':''} onClick={onJoin}>{joined?<><Check size={18}/> 已加入队伍</>:<><UserPlus size={18}/> 加入队伍</>}</button></aside>;
}

function Discover({ city, setToast }) {
  const [day, setDay] = useState('周六');
  const [interest, setInterest] = useState('展览');
  const [budget, setBudget] = useState('¥ 0–200');
  const [people, setPeople] = useState('2–4人');
  const [loading, setLoading] = useState(false);
  const [joined, setJoined] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState([false,false,false]);
  const [batch, setBatch] = useState(0);
  const plan = getPlan(city, interest, day);
  const currentInspirations = inspirationBatches[batch];
  function generate(){setLoading(true);setTimeout(()=>{setLoading(false);setToast(`已按「${city} · ${day} · ${interest} · ${budget} · ${people}」重新安排路线`);},700)}
  function join(){setJoined(value => !value);setToast(joined?'已退出这支队伍':'加入成功！出发前可在「组队」页联系大家')}
  function savePlan(){setSaved(value => !value);setToast(saved?'已取消收藏':'路线已收藏，可从小橙的个人菜单查看')}
  function swapInspirations(){setBatch(value => value === 0 ? 1 : 0);setLikes([false,false,false]);setToast('已换一批周末灵感')}
  function toggleLike(index){setLikes(values => values.map((value, itemIndex) => itemIndex === index ? !value : value));setToast(likes[index]?'已取消收藏':'已加入收藏')}
  async function share(){
    try {
      await navigator.clipboard.writeText(location.href);
      setToast('链接已复制，可以发给搭子了');
    } catch {
      setToast('分享链接：' + location.href);
    }
  }
  return <>
    <main>
      <section className="intro"><div><h1>这周末，出去走走</h1><Sun className="sun-doodle" size={48}/></div><p>按你的天气、预算和心情，挑好一条刚刚好的路线。</p></section>
      <PreferenceBar {...{city,day,setDay,interest,setInterest,budget,setBudget,people,setPeople,onGenerate:generate,loading}}/>
      <div className="primary-grid"><Itinerary plan={plan} city={city} day={day} saved={saved} onSave={savePlan}/><TeamPanel day={day} joined={joined} onJoin={join}/></div>
      <section className="inspiration"><div className="section-title"><h2>灵感候选</h2><button onClick={swapInspirations}>换一批 <RefreshCw size={15}/></button></div>{currentInspirations.map((item,i)=><article className="inspiration-row" key={item.title}><div className="thumb" style={{background:item.color}}><Compass size={25}/><span>{String(i+1).padStart(2,'0')}</span></div><div className="inspiration-copy"><button className="inspiration-link" onClick={()=>setToast(`已打开「${item.title}」路线详情`)}><h3>{item.title}</h3></button><p>{item.desc}</p></div><p className="row-meta"><MapPin size={16}/>{item.meta}</p><div className="collectors"><span className="mini-faces"><i/><i/><i/></span>同校 12 人收藏</div><button aria-label={likes[i]?'取消收藏候选路线':'收藏候选路线'} className={`row-heart ${likes[i]?'saved':''}`} onClick={()=>toggleLike(i)}><Heart size={21} fill={likes[i]?'currentColor':'none'}/></button></article>)}</section>
    </main>
    <footer><strong>周末搭子.</strong><span>不必去远方，附近就有新鲜事。</span><button onClick={share}><Share2 size={16}/> 分享给朋友</button></footer>
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
  const [city,setCity]=useState('上海');
  const [toast,setToast]=useState('');
  React.useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(''),2600);return()=>clearTimeout(t)},[toast]);
  return <div className="app"><Header {...{active,setActive,city,setCity,setToast}}/>{active==='发现'?<Discover city={city} setToast={setToast}/>:<PlaceholderPage type={active} setToast={setToast}/>} {toast?<div className="toast"><Check size={17}/>{toast}<button onClick={()=>setToast('')} aria-label="关闭提示"><X size={15}/></button></div>:null}</div>
}

createRoot(document.getElementById('root')).render(<App/>);
