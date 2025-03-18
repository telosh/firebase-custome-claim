import {onCall} from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import {initializeApp} from "firebase-admin/app";
import {getAuth} from "firebase-admin/auth";


initializeApp();

// ユーザーロールの型定義
type UserRole = "admin" | "company" | "engineer";

// リクエストデータの型定義
interface SetUserRoleData {
  role: UserRole;
}

// ユーザーのロールを設定する関数
export const setUserRole = onCall<SetUserRoleData>(async (request) => {
  const {data, auth} = request;

  // 認証チェック
  if (!auth) {
    logger.error("未認証のユーザーがロール設定を試みました");
    throw new functions.https.HttpsError(
      "unauthenticated",
      "ユーザーが認証されていません。"
    );
  }

  const {role} = data;
  const uid = auth.uid;

  // 有効なロールかチェック
  if (!["admin", "company", "engineer"].includes(role)) {
    logger.error(`無効なロールが指定されました: ${role}`);
    throw new functions.https.HttpsError(
      "invalid-argument",
      "無効なロールが指定されました。"
    );
  }

  try {
    logger.info(`ユーザー ${uid} のロールを ${role} に設定します`);

    // カスタムクレームを設定
    await getAuth().setCustomUserClaims(uid, {role});
    logger.info(`ユーザー ${uid} のカスタムクレームを ${role} に設定しました`);

    return {
      success: true,
      message: `ロールが正常に設定されました: ${role}`,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error("ユーザー情報の更新に失敗:", error);
    throw error;
  }
});