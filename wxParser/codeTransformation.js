/**
 * 特殊字符映射表
 * @type {Object}
 */
const codeMap = {
  // HTML 支持的数学符号
  '&forall;': '∀',
  '&part;': '∂',
  '&exists;': '∃',
  '&empty;': '∅',
  '&nabla;': '∇',
  '&isin;': '∈',
  '&notin;': '∉',
  '&ni;': '∋',
  '&prod;': '∏',
  '&sum;': '∑',
  '&minus;': '−',
  '&lowast;': '∗',
  '&radic;': '√',
  '&prop;': '∝',
  '&infin;': '∞',
  '&ang;': '∠',
  '&and;': '∧',
  '&or;': '∨',
  '&cap;': '∩',
  '&cap;': '∪',
  '&int;': '∫',
  '&there4;': '∴',
  '&sim;': '∼',
  '&cong;': '≅',
  '&asymp;': '≈',
  '&ne;': '≠',
  '&le;': '≤',
  '&ge;': '≥',
  '&sub;': '⊂',
  '&sup;': '⊃',
  '&nsub;': '⊄',
  '&sube;': '⊆',
  '&supe;': '⊇',
  '&oplus;': '⊕',
  '&otimes;': '⊗',
  '&perp;': '⊥',
  '&sdot;': '⋅',

  // HTML 支持的希腊字母
  '&Alpha;': 'Α',
  '&Beta;': 'Β',
  '&Gamma;': 'Γ',
  '&Delta;': 'Δ',
  '&Epsilon;': 'Ε',
  '&Zeta;': 'Ζ',
  '&Eta;': 'Η',
  '&Theta;': 'Θ',
  '&Iota;': 'Ι',
  '&Kappa;': 'Κ',
  '&Lambda;': 'Λ',
  '&Mu;': 'Μ',
  '&Nu;': 'Ν',
  '&Xi;': 'Ν',
  '&Omicron;': 'Ο',
  '&Pi;': 'Π',
  '&Rho;': 'Ρ',
  '&Sigma;': 'Σ',
  '&Tau;': 'Τ',
  '&Upsilon;': 'Υ',
  '&Phi;': 'Φ',
  '&Chi;': 'Χ',
  '&Psi;': 'Ψ',
  '&Omega;': 'Ω',
  '&alpha;': 'α',
  '&beta;': 'β',
  '&gamma;': 'γ',
  '&delta;': 'δ',
  '&epsilon;': 'ε',
  '&zeta;': 'ζ',
  '&eta;': 'η',
  '&theta;': 'θ',
  '&iota;': 'ι',
  '&kappa;': 'κ',
  '&lambda;': 'λ',
  '&mu;': 'μ',
  '&nu;': 'ν',
  '&xi;': 'ξ',
  '&omicron;': 'ο',
  '&pi;': 'π',
  '&rho;': 'ρ',
  '&sigmaf;': 'ς',
  '&sigma;': 'σ',
  '&tau;': 'τ',
  '&upsilon;': 'υ',
  '&phi;': 'φ',
  '&chi;': 'χ',
  '&psi;': 'ψ',
  '&omega;': 'ω',
  '&thetasym;': 'ϑ',
  '&upsih;': 'ϒ',
  '&piv;': 'ϖ',
  '&middot;': '·',

  // 常用解析
  '&nbsp;': ' ',
  '&quot;': "'",
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',

  // HTML 支持的其他实体
  '&OElig;': 'Œ',
  '&oelig;': 'œ',
  '&Scaron;': 'Š',
  '&scaron;': 'š',
  '&Yuml;': 'Ÿ',
  '&fnof;': 'ƒ',
  '&circ;': 'ˆ',
  '&tilde;': '˜',
  '&ensp;': '',
  '&emsp;': '',
  '&thinsp;': '',
  '&zwnj;': '',
  '&zwj;': '',
  '&lrm;': '',
  '&rlm;': '',
  '&ndash;': '–',
  '&mdash;': '—',
  '&lsquo;': '‘',
  '&rsquo;': '’',
  '&sbquo;': '‚',
  '&ldquo;': '“',
  '&rdquo;': '”',
  '&bdquo;': '„',
  '&dagger;': '†',
  '&Dagger;': '‡',
  '&bull;': '•',
  '&hellip;': '…',
  '&permil;': '‰',
  '&prime;': '′',
  '&Prime;': '″',
  '&lsaquo;': '‹',
  '&rsaquo;': '›',
  '&oline;': '‾',
  '&euro;': '€',
  '&trade;': '™',
  '&larr;': '←',
  '&uarr;': '↑',
  '&rarr;': '→',
  '&darr;': '↓',
  '&harr;': '↔',
  '&crarr;': '↵',
  '&lceil;': '⌈',
  '&rceil;': '⌉',
  '&lfloor;': '⌊',
  '&rfloor;': '⌋',
  '&loz;': '◊',
  '&spades;': '♠',
  '&clubs;': '♣',
  '&hearts;': '♥',
  '&diams;': '♦',
};

/**
 * 转换特殊字符
 * @param  {String} str 待转换字符串
 * @return {String}     转换后的字符串
 */
const transform = (str) => {
  var symbol = /&#([a-z0-9]+);/gm;
  let m;
  while ((m = symbol.exec(str)) !== null) {
      if (m.index === symbol.lastIndex) {
        symbol.lastIndex++;
      }
      str = str.replace(new RegExp(`&#${m[1]};`, 'g'), String.fromCodePoint('0'+m[1]))
  }
  for (let code in codeMap) {
    str = str.replace(new RegExp(code, 'g'), codeMap[code]);
  }
  return str;
};

module.exports = {
  transform
}
