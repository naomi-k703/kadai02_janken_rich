 // JavaScriptファイルの開始
document.addEventListener("DOMContentLoaded", function () {
    // フォーム送信時に実行されるイベントリスナー
    document.getElementById("checkForm").addEventListener("submit", function (e) {
        e.preventDefault(); // フォームのデフォルト送信動作を防止

        // フォームからクライアント名と組織の成長段階の値を取得
        const clientName = document.getElementById("clientName").value;
        const orgStage = document.getElementById("orgStage").value;

        // チェックされた値を保存するためのオブジェクトを初期化
        const checkedValues = {
            psychologicalSafety: 0,        // 心理的安全性に関するスコア
            leadershipQuality: 0,          // リーダーシップの質に関するスコア
            communicationOpenness: 0,      // オープンなコミュニケーションに関するスコア
            careerVisionClarity: 0,        // キャリアビジョンの明確化に関するスコア
            selfEfficacy: 0,               // 自己効力感の向上に関するスコア
            jobMeaningUnderstanding: 0     // 仕事の意義の理解に関するスコア
        };

        // フォーム内のすべてのチェックボックスをループ処理
        document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
            // チェックボックスがチェックされている場合
            if (checkbox.checked) {
                // チェックボックスの値に応じて、対応するスコアを加算
                switch (checkbox.value) {
                    case "心理的安全性":
                    case "組織への貢献":
                        checkedValues.psychologicalSafety += 1;
                        break;
                    case "情報共有":
                    case "リーダーシップの質":
                        checkedValues.leadershipQuality += 1;
                        break;
                    case "相談理解":
                    case "傾聴":
                    case "役割理解":
                    case "報連相":
                    case "コミュニケーション手段":
                        checkedValues.communicationOpenness += 1;
                        break;
                    case "キャリアビジョン":
                    case "キャリア理解":
                    case "アクションプラン":
                        checkedValues.careerVisionClarity += 1;
                        break;
                    case "強み理解":
                    case "自己効力感":
                    case "感情コントロール":
                        checkedValues.selfEfficacy += 1;
                        break;
                    case "仕事の意義":
                    case "やりたいこと理解":
                    case "強みの活かし方":
                        checkedValues.jobMeaningUnderstanding += 1;
                        break;
                }
            }
        });

        // 結果セクションにクライアント名と組織段階を表示
        document.getElementById("clientNameResult").innerText = clientName;
        document.getElementById("orgStageResult").innerText = orgStage;

        // レーダーチャートを作成して表示
        createRadarChart(checkedValues);

        // 結果セクションを表示
        document.getElementById("result").style.display = "block";
    });

    // レーダーチャートを作成する関数
    function createRadarChart(values) {
        // キャンバスのコンテキストを取得
        const ctx = document.getElementById('resultChart').getContext('2d');

        // 既存のチャートがある場合は破棄
        if (window.myRadarChart) {
            window.myRadarChart.destroy();
        }

        // 新しいレーダーチャートを作成
        window.myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    "心理的安全性", 
                    "リーダーシップの質", 
                    "オープンなコミュニケーション", 
                    "キャリアビジョンの明確化", 
                    "自己効力感の向上", 
                    "仕事の意義の理解"
                ],
                datasets: [{
                    label: '診断結果',
                    data: [
                        values.psychologicalSafety,
                        values.leadershipQuality,
                        values.communicationOpenness,
                        values.careerVisionClarity,
                        values.selfEfficacy,
                        values.jobMeaningUnderstanding
                    ],
                    backgroundColor: 'rgba(0, 99, 132, 0.2)', // レーダーチャートの背景色
                    borderColor: 'rgba(0, 99, 132, 1)',       // レーダーチャートの枠線色
                    borderWidth: 2                            // レーダーチャートの枠線の太さ
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true, // 0からスケールを開始
                        min: 0,            // 最小値
                        max: 5,            // 最大値（項目数によって調整可能）
                        stepSize: 1        // ステップサイズ
                    }
                }
            }
        });
    }
});
