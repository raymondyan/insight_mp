const HOST = "https://insight-dev.thoughtworks.cn/wp-json"

function getURL(api) {
  return HOST + api;
}

function getCategories() {
  return getURL('/wp/v2/categories?per_page=20&orderby=count&order=desc&context=embed');
}

function getTags() {
  return getURL('/wp/v2/tags?per_page=20&orderby=count&order=desc&context=embed')
}

function getArticleByCategoryId(categoryId, pageNum) {
  return getURL('/wp/v2/posts?categories=' + categoryId + '&orderby=date&order=desc&context=view&page=' + pageNum);
}

function getArticleThumb(mediaId) {
  return getURL('/wp/v2/media/' + mediaId + '?context=embed');
}

function getArticle(articleId) {
  return getURL('/wp/v2/posts/' + articleId)
}

function getUser(userId) {
  return getURL('/wp/v2/users/' + userId)
}

function getRelatedCategories(ids) {
  return getURL('/wp/v2/categories?include=' + ids)
}

function getRecentPost(pageNum) {
  return getURL('/wp/v2/posts?orderby=date&order=desc&context=view&per_page=8&page=' + pageNum)
}

function searchPosts(keyword) {
  return getURL('/wp/v2/posts?orderby=date&order=desc&context=view&per_page=20&search=' + keyword)
}

function getComment(postId) {
  return getURL('/wp/v2/comments?status=approve&orderby=date&order=desc&context=view&per_page=100&page=1&post=' + postId)
}

function postComment(nickName, avatarUrl, comment, articleId) {
  return getURL('/wp/v2/comments?author_name=' + nickName + '&author_url=' + avatarUrl + '&author_email=wxapp@wechat.qq.com&content=' + comment + '&post=' + articleId)
}


module.exports = {
  getCategories: getCategories,
  getTags: getTags,
  getArticleByCategoryId: getArticleByCategoryId,
  getArticleThumb: getArticleThumb,
  getArticle: getArticle,
  getUser: getUser,
  getRelatedCategories: getRelatedCategories,
  getRecentPost: getRecentPost,
  getComment: getComment,
  searchPosts: searchPosts,
  postComment: postComment
};