const HOST = "http://ec2-52-80-59-127.cn-north-1.compute.amazonaws.com.cn:81/wp-json"

function getURL(api) {
  return HOST + api;
}

function getCategories() {
  return getURL('/wp/v2/categories?per_page=20&orderby=count&order=desc&context=embed');
}

function getArticleByCategoryId(categoryId, pageNum) {
  return getURL('/wp/v2/posts?categories=' + categoryId + '&orderby=date&order=desc&context=embed&per_page=5&page=' + pageNum);
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

module.exports = {
  getCategories: getCategories,
  getArticleByCategoryId: getArticleByCategoryId,
  getArticleThumb: getArticleThumb,
  getArticle: getArticle,
  getUser: getUser,
  getRelatedCategories: getRelatedCategories,
  getRecentPost: getRecentPost
};