import html2Json from "../wxParser/html2json";
import R from "ramda";
import {hommizationTime} from "util";

const combineComments = (cleanComments) => R.compose(
  R.map(comment => {
    return R.assoc('children', R.filter(R.propEq('parent', comment.id))(cleanComments))(comment)
  }),
  R.filter(R.propEq('parent', 0))
)(cleanComments);

const parseComment = (comments) => R.compose(
  R.map(R.omit(['content'])),
  R.map(comment => {
    return R.assoc('hommizationTime', hommizationTime(comment.date))(comment)
  }),
  R.map(comment => {
    return R.assoc('isFromMA', comment.author_url.indexOf("wx.qlogo.cn") != -1 )(comment)
  }),
  R.map(comment => {
    return R.assoc('comment', parseHTML(comment.content.rendered))(comment)
  }),
  R.map(R.omit(['date_gmt', 'meta', 'post', 'status', 'type', '_links', 'link']))
)(comments);

const structureComments = (comments) => {
    const cleanComments = parseComment(comments);
    return combineComments(cleanComments)
};

const parseHTML = (html) => {
  let bind = "content";
  let transData;
  transData = html2Json.html2json(html, bind);
  return transData
}

module.exports = {
  structureComments: structureComments
};