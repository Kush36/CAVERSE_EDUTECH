// Static/mock CA news — no external API key required
const mockNews = [
  {
    id: 1,
    title: 'ICAI Releases CA Final Exam Schedule for November 2024',
    summary:
      'The Institute of Chartered Accountants of India (ICAI) has announced the examination schedule for CA Final November 2024 attempt.',
    date: '2024-07-10',
    category: 'Exam Updates',
    source: 'ICAI Official',
    url: 'https://www.icai.org',
    featured: true,
  },
  {
    id: 2,
    title: 'New Syllabus for CA Foundation 2024 – Key Changes',
    summary:
      'ICAI has introduced significant changes to the CA Foundation syllabus effective from the 2024 batch. Students should review the updated curriculum.',
    date: '2024-07-05',
    category: 'Syllabus',
    source: 'ICAI Official',
    url: 'https://www.icai.org',
    featured: true,
  },
  {
    id: 3,
    title: 'CA Intermediate Results Declared – May 2024',
    summary:
      'ICAI has declared the CA Intermediate examination results for May 2024. Students can check their results on the official ICAI portal.',
    date: '2024-07-01',
    category: 'Results',
    source: 'ICAI Official',
    url: 'https://www.icai.org',
    featured: false,
  },
  {
    id: 4,
    title: 'GST Amendments: What CA Students Need to Know',
    summary:
      'Recent amendments to the Goods and Services Tax Act have important implications for CA students preparing for taxation papers.',
    date: '2024-06-25',
    category: 'Taxation',
    source: 'Tax Guru',
    url: 'https://taxguru.in',
    featured: false,
  },
  {
    id: 5,
    title: 'Companies Act 2013 – Recent MCA Circulars',
    summary:
      'The Ministry of Corporate Affairs has issued several important circulars affecting compliance requirements under the Companies Act 2013.',
    date: '2024-06-18',
    category: 'Corporate Law',
    source: 'MCA',
    url: 'https://www.mca.gov.in',
    featured: false,
  },
  {
    id: 6,
    title: 'RBI Monetary Policy – Key Takeaways for Finance Students',
    summary:
      'The Reserve Bank of India\'s latest monetary policy statement has key takeaways for students preparing for Strategic Financial Management.',
    date: '2024-06-10',
    category: 'Finance',
    source: 'RBI',
    url: 'https://www.rbi.org.in',
    featured: true,
  },
  {
    id: 7,
    title: 'ICAI Launches New e-Learning Portal for CA Students',
    summary:
      'ICAI has launched an enhanced e-learning portal with video lectures, mock tests, and study material for all levels of CA examination.',
    date: '2024-06-01',
    category: 'Resources',
    source: 'ICAI Official',
    url: 'https://www.icai.org',
    featured: false,
  },
  {
    id: 8,
    title: 'Income Tax Amendments – Budget 2024 Analysis',
    summary:
      'A comprehensive analysis of Income Tax amendments announced in Budget 2024, relevant for CA students preparing for Direct Tax papers.',
    date: '2024-05-25',
    category: 'Taxation',
    source: 'CAVERSE EduTech',
    url: '#',
    featured: false,
  },
];

exports.getNews = (req, res) => {
  const { page = 1, limit = 6, category } = req.query;
  let news = category ? mockNews.filter((n) => n.category === category) : mockNews;

  const total = news.length;
  const skip  = (Number(page) - 1) * Number(limit);
  news = news.slice(skip, skip + Number(limit));

  res.json({
    success: true,
    data: {
      news,
      pagination: { total, page: Number(page), limit: Number(limit), pages: Math.ceil(total / limit) },
    },
  });
};

exports.getFeaturedNews = (req, res) => {
  const featured = mockNews.filter((n) => n.featured);
  res.json({ success: true, data: { news: featured } });
};
