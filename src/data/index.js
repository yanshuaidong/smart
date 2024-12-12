// 贵金属组
import gold from './precious_metals/gold';
import silver from './precious_metals/silver';

// 有色金属组
import cu from './base_metals/cu';
import al from './base_metals/al';
import alo from './base_metals/alo';
import zn from './base_metals/zn';
import pb from './base_metals/pb';
import ni from './base_metals/ni';
import sn from './base_metals/sn';
import ss from './base_metals/ss';

// 硅产业链
import si from './silicon_chain/si';
import poly from './silicon_chain/poly';
import li from './silicon_chain/li';

// 黑色金属组
import i from './ferrous_metals/i';
import rb from './ferrous_metals/rb';
import hc from './ferrous_metals/hc';
import sf from './ferrous_metals/sf';
import sm from './ferrous_metals/sm';
import j from './ferrous_metals/j';
import jm from './ferrous_metals/jm';
import zc from './ferrous_metals/zc';

// 化工品组
import fg from './chemicals/fg';
import px from './chemicals/px';
import ta from './chemicals/ta';
import eg from './chemicals/eg';
import ru from './chemicals/ru';
import br from './chemicals/br';
import bu from './chemicals/bu';
import l from './chemicals/l';
import pp from './chemicals/pp';

// 农产品组
import p from './agricultural/p';
import y from './agricultural/y';
import m from './agricultural/m';
import a from './agricultural/a';
import c from './agricultural/c';
import sr from './agricultural/sr';
import cf from './agricultural/cf';
import jd from './agricultural/jd';
import lh from './agricultural/lh';
import pn from './agricultural/pn';

function getAllData() {
  return [
    // 贵金属组
    gold,
    silver,
    // 有色金属组
    cu,
    al,
    alo,
    zn,
    pb,
    ni,
    sn,
    ss,
    // 硅产业链
    si,
    poly,
    li,
    // 黑色金属组
    i,
    rb,
    hc,
    sf,
    sm,
    j,
    jm,
    zc,
    // 化工品组
    fg,
    px,
    ta,
    eg,
    ru,
    br,
    bu,
    l,
    pp,
    // 农产品组
    p,
    y,
    m,
    a,
    c,
    sr,
    cf,
    jd,
    lh,
    pn,
  ];
}

function getAllDataName() {
  return getAllData().map((item) => item.name);
}

export { getAllData, getAllDataName };
