// JavaScriptファイルの開始
document.addEventListener("DOMContentLoaded", function () {

    // フォームの送信イベントリスナーを設定
    document.getElementById("checkForm").addEventListener("submit", function (e) {
        e.preventDefault(); // フォームの送信を防止

        // クライアント名と組織段階を取得
        const clientName = document.getElementById("clientName").value;
        const orgStage = document.getElementById("orgStage").value;

        // 選択されたチェックボックスの値を取得
        const checkedValues = {
            psychologicalSafety: 0,
            leadershipQuality: 0,
            communicationOpenness: 0,
            careerVisionClarity: 0,
            selfEfficacy: 0,
            jobMeaningUnderstanding: 0
        };

        // チェックされた項目に応じてスコアを加算
        document.querySelectorAll("input[type='checkbox']").forEach(function (checkbox) {
            if (checkbox.checked) {
                switch (checkbox.value) {
                    case "心理的安全性":
                        checkedValues.psychologicalSafety += 2;
                        break;
                    case "リーダーシップの質":
                        checkedValues.leadershipQuality += 1;
                        break;
                    case "オープンなコミュニケーション":
                        checkedValues.communicationOpenness += 2;
                        break;
                    case "キャリアビジョンの明確化":
                        checkedValues.careerVisionClarity += 0;
                        break;
                    case "自己効力感の向上":
                        checkedValues.selfEfficacy += 0;
                        break;
                    case "仕事の意義の理解":
                        checkedValues.jobMeaningUnderstanding += 2;
                        break;
                }
            }
        });

        // 結果表示のためのDOM操作
        document.getElementById("clientNameResult").innerText = clientName;
        document.getElementById("orgStageResult").innerText = orgStage;

        // レーダーチャートを作成する関数を呼び出し
        createRadarChart(checkedValues);

        // 結果セクションを表示
        document.getElementById("result").style.display = "block";
    });

    // レーダーチャートを作成する関数
    function createRadarChart(values) {
        const ctx = document.getElementById('resultChart').getContext('2d');

        // 既存のチャートを削除して新しいチャートを作成
        if (window.myRadarChart) {
            window.myRadarChart.destroy();
        }

        window.myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ["心理的安全性", "リーダーシップの質", "オープンなコミュニケーション", "キャリアビジョンの明確化", "自己効力感の向上", "仕事の意義の理解"],
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
                    backgroundColor: 'rgba(0, 68, 204, 0.2)',
                    borderColor: 'rgba(0, 68, 204, 1)',
                    borderWidth: 2
                }]
            },
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        min: 0,
                        max: 2,
                        stepSize: 1
                    }
                }
            }
        });
    }
});


