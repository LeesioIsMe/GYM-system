/*
 Navicat Premium Data Transfer

 Source Server         : mydb
 Source Server Type    : MySQL
 Source Server Version : 80016
 Source Host           : localhost
 Source Database       : gym

 Target Server Type    : MySQL
 Target Server Version : 80016
 File Encoding         : utf-8

 Date: 06/08/2019 20:13:57 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `conversation`
-- ----------------------------
DROP TABLE IF EXISTS `conversation`;
CREATE TABLE `conversation` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `serviceId` varchar(255) NOT NULL,
  `fromId` varchar(255) NOT NULL,
  `toId` varchar(255) NOT NULL,
  `content` varchar(500) NOT NULL,
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `conversation`
-- ----------------------------
BEGIN;
INSERT INTO `conversation` VALUES ('1557036533905884ACOUNT1777217618723456', '884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '23456', '1', '2019-05-05 14:08:54'), ('1557039440087884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '1', '2019-05-05 14:57:20'), ('1557039453411884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '1', '2019-05-05 14:57:33'), ('1557039458197884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '1', '2019-05-05 14:57:38'), ('1557039459413884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '12', '2019-05-05 14:57:39'), ('1557039461238884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '1213', '2019-05-05 14:57:41'), ('1557039462861884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '121314', '2019-05-05 14:57:43'), ('1557039466547884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '121314', '2019-05-05 14:57:47'), ('1557041111999884ACOUNT1777217618723456', '884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '23456', '我想了解俱乐部信息', '2019-05-05 15:25:12'), ('1557041168703884ACOUNT1777217618723456', '884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '23456', '很高兴为您服务', '2019-05-05 15:26:09'), ('155704232523512345884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '884ACOUNT17772176187', '12345', '请问你要干嘛', '2019-05-05 15:45:25'), ('155704243462523456884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '我是客服小美', '2019-05-05 15:47:15'), ('155704263255912345884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '需要点餐吗', '2019-05-05 15:50:33'), ('155704286820912345884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '具有点餐功能', '2019-05-05 15:54:28'), ('1557067505029884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '请问你需要哪些资料', '2019-05-05 22:45:05'), ('1557067520068884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '', '需要帮助吗', '2019-05-05 22:45:20'), ('1558403985517884ACOUNT1777217618723456', '884ACOUNT17772176187', '23456', '884ACOUNT17772176187', '23456', '有什么课程\n', '2019-05-21 09:59:45'), ('1558403998931884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '1213214\n', '2019-05-21 09:59:58'), ('1559806705819884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '需要帮助吗\n', '2019-06-06 15:38:25'), ('1559806706069884ACOUNT1777217618712345', '884ACOUNT17772176187', '12345', '884ACOUNT17772176187', '12345', '', '2019-06-06 15:38:26'), ('isLookMore', '884ACOUNT17772176187', '23456', '23456', '884ACOUNT17772176187', '不你不想', '2019-05-06 14:28:35');
COMMIT;

-- ----------------------------
--  Table structure for `news`
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news` (
  `id` varchar(255) NOT NULL,
  `imgPath` varchar(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `uid` varchar(255) NOT NULL,
  `substract` varchar(500) NOT NULL,
  `content` longtext,
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `news`
-- ----------------------------
BEGIN;
INSERT INTO `news` VALUES ('1556792138263884ACOUNT17772176187', '', '向上健身俱乐部', '884ACOUNT17772176187', '向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部', '<p>向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部</p><p>&nbsp; &nbsp; 向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部<br></p><p>向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部</p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部&nbsp;&nbsp;&nbsp;&nbsp;<br></p><p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部向上健身俱乐部https://sv.baidu.com/videoui/page/videoland?pd=bjh&amp;context={%22nid%22:%2211179489968135729213%22,%22sourceFrom%22:%22bjh%22}&amp;fr=bjhauthor&amp;type=video<br></p><p><br></p>', '2019-05-02 18:15:38'), ('a', '/images/other/5cc26c2c19a9a.jpg', '哪家健身俱乐部值得推荐？', '913ACOUNT17777777777', '哪家健身俱乐部值得推荐？', '向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向', '2019-04-30 17:07:21'), ('awad', '/images/other/5cc26c2c19a9a.jpg', '哪家健身俱乐部值得推荐？', '913ACOUNT17777777777', '哪家健身俱乐部值得推荐？', '向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向', '2019-04-30 17:07:21'), ('bwad', '/images/other/5cc267632f98c.jpg', '健身房的优点是什么', '913ACOUNT17777777777', '健身房的优点是什么', '向向向向向向向向向向向向向向向向向向向向向向向向向', '2010-04-30 17:07:21'), ('cwad', '/images/other/5cc5153b395b2.jpg', '健身行业前景如何，做私教有没有前途', '913ACOUNT17777777777', '健身行业前景如何，做私教有没有前途', '向向向向向向向向向向', '2018-04-30 17:07:21'), ('dddd', '/images/other/5cc50dcbdd0ba.jpg', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '913ACOUNT17777777777', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向向', '2017-04-30 17:07:21'), ('edaa', '/images/other/5cc5153b395b2.jpg', '健身行业前景如何，做私教有没有前途', '913ACOUNT17777777777', '健身行业前景如何，做私教有没有前途', '向向向向向向向向向向向', '2016-04-30 17:07:21'), ('fadw', '/images/other/5cc50dcbdd0ba.jpg', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '913ACOUNT17777777777', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '向向向', '2015-04-30 17:07:21'), ('gadw', '/images/other/5cc267632f98c.jpg', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '913ACOUNT17777777777', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '向向向向向向向', '2014-04-30 17:07:21'), ('idad', '/images/other/5cc5153b395b2.jpg', '健身房的优点是什么', '913ACOUNT17777777777', '健身半年暴瘦60斤，自律改变人生！为什么那么多人都在坚持锻炼', '向向向向向向向向', '2012-04-30 17:07:21'), ('jdaw', '/images/other/5cc26c2c19a9a.jpg', '哪家健身俱乐部值得推荐？', '913ACOUNT17777777777', '', '向向向', '2011-04-30 17:07:21');
COMMIT;

-- ----------------------------
--  Table structure for `service`
-- ----------------------------
DROP TABLE IF EXISTS `service`;
CREATE TABLE `service` (
  `id` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `service`
-- ----------------------------
BEGIN;
INSERT INTO `service` VALUES ('12345', '客服小尚', '2019-05-05 13:39:12'), ('23456', '客服小美', '2019-05-05 13:39:31'), ('34567', '客服小发', '2019-05-05 13:40:05');
COMMIT;

-- ----------------------------
--  Table structure for `teachs`
-- ----------------------------
DROP TABLE IF EXISTS `teachs`;
CREATE TABLE `teachs` (
  `id` varchar(255) NOT NULL,
  `name` varchar(20) NOT NULL,
  `alt` varchar(255) DEFAULT NULL COMMENT '教练备注',
  `logo` varchar(255) DEFAULT NULL,
  `createTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `teachs`
-- ----------------------------
BEGIN;
INSERT INTO `teachs` VALUES ('111', '刘成', '中国好教练五星级认证', ' /images/teacher1.jpg', '2019-05-02 20:19:32'), ('222', '张飞', '国家一级健身指导员', ' /images/teacher3.jpg', '2019-05-03 13:33:59'), ('333', '白令', '私人教练', ' /images/teacher2.jpg', '2019-05-02 13:34:02'), ('444', '陈晨', '泰拳认证教练', ' /images/teacher4.jpg', '2019-05-01 13:34:06'), ('555', '唐晨', '私人教练', ' /images/teacher5.jpg', '2019-04-29 13:34:10'), ('777', '杨龙', '私人教练', ' /images/teacher6.jpg', '2019-04-30 13:34:19');
COMMIT;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` varchar(255) NOT NULL COMMENT '用户的ID',
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '用户姓名',
  `account` varchar(18) NOT NULL COMMENT '用户账号',
  `password` varchar(255) NOT NULL COMMENT '用户密码',
  `phone` varchar(11) DEFAULT NULL COMMENT '用户电话',
  `createTime` datetime NOT NULL COMMENT '创建时间',
  `updateTime` datetime DEFAULT NULL COMMENT '上次更新时间',
  `logo` varchar(255) DEFAULT NULL COMMENT '用户头像',
  `status` int(2) DEFAULT '2' COMMENT '是否是超级会员 0:普通vip 1:超级vip 2:游客',
  `type` int(1) DEFAULT '1' COMMENT '0:客服 1:用户',
  `tid` varchar(255) DEFAULT NULL,
  `teach` varchar(20) DEFAULT '' COMMENT '教练',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('12345', '客服小尚', '13333333333', 'e10adc3949ba59abbe56e057f20f883e', '13333333333', '2019-05-05 15:09:54', '2019-05-05 15:09:58', null, '1', '0', null, ''), ('23456', '客服小美', '13333333334', 'e10adc3949ba59abbe56e057f20f883e', '13333333334', '2019-05-05 15:11:17', '2019-05-05 15:11:13', null, '0', '0', null, ''), ('271ACOUNT15039128301', '封故', '15039128301', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 13:33:37', '2019-06-06 11:23:17', null, '0', '1', '555', '唐晨'), ('34567', '客服小发', '13333333335', 'e10adc3949ba59abbe56e057f20f883e', '13333333335', '2019-05-05 15:12:14', '2019-05-05 15:12:17', null, '0', '0', null, ''), ('43ACOUNT13345678912', '张甜甜', '13345678912', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 15:29:25', '2019-06-06 11:21:14', null, '2', '1', '222', '张飞'), ('551ACOUNT13462229618', '胡乎', '13462229618', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 11:41:30', '2019-06-06 11:23:49', null, '2', '1', '777', '杨龙'), ('809ACOUNT18888888889', '唐小晨', '18888888889', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 13:58:42', '2019-06-06 11:21:35', null, '2', '1', '444', '陈晨'), ('884ACOUNT17772176187', '刘大宝', '17772176187', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 18:37:14', '2019-06-06 11:22:12', null, '2', '1', '333', '白令'), ('913ACOUNT17777777777', '古锋', '17777777777', 'e10adc3949ba59abbe56e057f20f883e', '无', '2019-04-30 13:36:49', '2019-06-06 11:22:46', null, '2', '1', '111', '刘成');
COMMIT;

-- ----------------------------
--  Table structure for `user_course`
-- ----------------------------
DROP TABLE IF EXISTS `user_course`;
CREATE TABLE `user_course` (
  `id` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL,
  `courseId` int(11) NOT NULL,
  `startTime` datetime NOT NULL,
  `endTime` datetime NOT NULL,
  `createTime` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
--  Records of `user_course`
-- ----------------------------
BEGIN;
INSERT INTO `user_course` VALUES ('730884ACOUNT177721761871', '884ACOUNT17772176187', '1', '2019-06-08 00:00:00', '2019-06-08 00:00:00', '2019-06-08 19:55:41');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
