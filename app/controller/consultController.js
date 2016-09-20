app.controller('consultCtrl', function ($scope, $rootScope, $routeParams,$http,Data) {
    $scope.formData = {};
    $scope.formData.score_away = 0;
    $scope.formData.score_home = 0;

    $scope.loadTeams = function(countryId) {
        Data.get('groups/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function (results) {
            $scope.groups = results;
        });
    };

    $scope.loadAllMatches = function(group) {
        Data.get('matches/%25/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.matches = results;
            $scope.matchesForGroup = '%25';
            $scope.matchesForTeam = 0;
        });
    };

    $scope.loadMatchesForGroup = function(group) {
        Data.get('matches/'+group+'/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.matches = results;
            $scope.matchesForGroup = group;
            $scope.matchesForTeam = 0;
        });
    };

    $scope.loadMatchesForTeam = function(team) {
        Data.get('matchesByTeam/'+team+'/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.matches = results;
            $scope.matchesForGroup = '';
            $scope.matchesForTeam = team;
        });
    };

    $scope.loadBets = function() {
        Data.get('bets/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.bets = results;
        });
    };

    $scope.openBet = function(match) {
        Data.get('matchById/'+match+'/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.bet = results;
            $scope.formData.score_away = 0;
            $scope.formData.score_home = 0;
            for(ind in $scope.bets) {
                if(match == $scope.bets[ind].match) {
                    $scope.formData.score_away = parseInt($scope.bets[ind].score_away);
                    $scope.formData.score_home = parseInt($scope.bets[ind].score_home);
                    break;
                }
            }
            $scope.formData.matchId = match;
            $scope.loadChart();
            $("#modalBet").modal();
        });
    };

    $scope.saveBet = function() {
        var postedData = JSON.stringify({
            match: $scope.formData.matchId,
            score_home:$scope.formData.score_home,
            score_away:$scope.formData.score_away
        });
        Data.post('bet/',
            postedData
        ,{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function (results) {
            Data.toast(results);
            $scope.loadBets();
            $("#modalBet").modal('hide');
            if($scope.matchesForTeam > 0)
                $scope.loadMatchesForTeam($scope.matchesForTeam);
            else
                $scope.loadMatchesForGroup($scope.matchesForGroup);
        });
    };

    $scope.loadTopUsers = function() {
        Data.get('top/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.tops = results.series;
            $scope.users = results.users;
            $scope.loadChartTop();
            $scope.loadPoints();
            $("#modalTop").modal();
        });
    };

    $scope.loadPoints = function() {
        Data.get('points/',{headers: {'X-Auth-Token': $rootScope.xAuth}}).then(function(results) {
            $scope.points = results;
            console.log(results);
        });
    };

    $scope.toggleGroup = function(group) {
        $(".teams").hide();
        $("#teams_"+group).show();
    };

    $scope.checkBet = function(match) {
        for(bet in $scope.bets) {
            if(match == $scope.bets[bet].match) {
                return true;
            }
        }
    };

    $scope.setAffix = function() {
        $('#groups').affix({
            offset: {
                top: 150,
                bottom: 0
            }
        });
    };

    $scope.loadChartTop = function() {
        $(function () {
            $('#chartTop').highcharts({
                chart: {
                    type: 'bar'
                },
                title: {
                    text: 'Classement'
                },
                xAxis: {
                    categories: ['Points']
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Points'
                    }
                },
                legend: {
                    reversed: true
                },
                plotOptions: {
                    series: {
                    }
                },
                series: $scope.tops
            });
        });
    };

    $scope.loadChart = function() {
        $('#chart').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Tendances'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        }
                    }
                }
            },
            series: [{
                name: 'Pronostics',
                colorByPoint: true,
                data: [{
                    name: $scope.bet.team_home,
                    y: $scope.bet.bet_home
                }, {
                    name: $scope.bet.team_away,
                    y: $scope.bet.bet_away
                }, {
                    name: 'Match nul',
                    y: $scope.bet.bet_draw
                }]
            }]
        });
    };

    $scope.loadTeams();
    $scope.loadAllMatches();
    $scope.loadBets();
    $scope.setAffix();
});
