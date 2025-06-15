import { Mail, Check, Trash2 } from "lucide-react";

const EmailList = () => {
  const emails = [
    {
      id: 1,
      sender: "株式会社テックイノベーション",
      subject: "【最終面接のご案内】エンジニア職選考について",
      preview:
        "先日は二次面接にお越しいただき、ありがとうございました。選考の結果、最終面接にお進みいただくことになりました。",
      timestamp: "2時間前",
    },
    {
      id: 2,
      sender: "人事部 - 株式会社グローバルソリューションズ",
      subject: "書類選考結果のご連絡",
      preview:
        "この度は弊社の新卒採用にご応募いただき、誠にありがとうございます。書類選考の結果をお知らせいたします。",
      timestamp: "5時間前",
    },
    {
      id: 3,
      sender: "リクルート事務局",
      subject: "【一次面接日程調整】マーケティング職について",
      preview:
        "書類選考通過おめでとうございます。一次面接の日程についてご相談させていただきたく、ご連絡いたします。",
      timestamp: "1日前",
    },
    {
      id: 4,
      sender: "株式会社スタートアップベンチャー",
      subject: "【内定通知】正式内定のご連絡",
      preview:
        "この度は長期間にわたる選考プロセスにご参加いただき、ありがとうございました。選考の結果、内定をお出しすることになりました。",
      timestamp: "2日前",
    },
    {
      id: 5,
      sender: "人材開発部 - 大手商社株式会社",
      subject: "インターンシップ参加確認書について",
      preview:
        "先日お申し込みいただいたサマーインターンシップの参加確認書をお送りいたします。ご確認のほど、よろしくお願いいたします。",
      timestamp: "3日前",
    },
  ];

  return (
    <div className="h-full max-w-sm bg-white flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {emails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 p-6">
            <Mail className="w-12 h-12 mb-3 text-gray-300" />
            <p className="text-sm font-medium">新着メールはありません</p>
            <p className="text-xs text-center mt-1">
              選考関連のメールが届くとここに表示されます
            </p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {emails.map((email) => (
              <div
                key={email.id}
                className={
                  "border rounded-lg p-4 transition-all hover:shadow-md "
                }
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2 flex-1 min-w-0">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {email.sender}
                      </p>
                      <p className="text-xs text-gray-500">{email.timestamp}</p>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">
                  {email.subject}
                </h3>

                <p className="text-xs text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                  {email.preview}
                </p>

                <div className="flex space-x-2">
                  <button className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white text-xs font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1">
                    <Check className="w-3 h-3" />
                    <span>選考登録</span>
                  </button>
                  <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-medium py-2 px-3 rounded-md transition-colors flex items-center justify-center space-x-1">
                    <Trash2 className="w-3 h-3" />
                    <span>無視</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailList;
