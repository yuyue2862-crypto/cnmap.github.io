// main.js - 中国行政区划匹配游戏 (修复计时问题版)

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // 1. 核心数据定义 (34个行政区完整数据)
    // ==========================================
    const PROVINCE_DATA = [
        { id: 'beijing', name: '北京市', abbr: '京', center: '北京', top: '28%', left: '68%', width: '2.8%', height: '2.8%' },
        { id: 'tianjin', name: '天津市', abbr: '津', center: '天津', top: '30%', left: '70%', width: '2.5%', height: '2.5%' },
        { id: 'shanghai', name: '上海市', abbr: '沪', center: '上海', top: '46%', left: '78%', width: '2%', height: '2%' },
        { id: 'chongqing', name: '重庆市', abbr: '渝', center: '重庆', top: '49%', left: '53%', width: '5%', height: '4.5%' },
        { id: 'hebei', name: '河北省', abbr: '冀', center: '石家庄', top: '25%', left: '65.5%', width: '3%', height: '12%' },
        { id: 'shanxi', name: '山西省', abbr: '晋', center: '太原', top: '31.5%', left: '61.5%', width: '4%', height: '8%' },
        { id: 'neimenggu', name: '内蒙古自治区', abbr: '蒙', center: '呼和浩特', top: '20%', left: '54%', width: '18%', height: '6.5%' },
        { id: 'liaoning', name: '辽宁省', abbr: '辽', center: '沈阳', top: '23%', left: '75%', width: '6%', height: '6%' },
        { id: 'jilin', name: '吉林省', abbr: '吉', center: '长春', top: '18%', left: '79%', width: '7%', height: '5%' },
        { id: 'heilongjiang', name: '黑龙江省', abbr: '黑', center: '哈尔滨', top: '7%', left: '79%', width: '13%', height: '9%' },
        { id: 'jiangsu', name: '江苏省', abbr: '苏', center: '南京', top: '40%', left: '73.5%', width: '5%', height: '8%' },
        { id: 'zhejiang', name: '浙江省', abbr: '浙', center: '杭州', top: '49%', left: '75%', width: '5%', height: '6%' },
        { id: 'anhui', name: '安徽省', abbr: '皖', center: '合肥', top: '43%', left: '70%', width: '4%', height: '8%' },
        { id: 'fujian', name: '福建省', abbr: '闽', center: '福州', top: '55.5%', left: '72%', width: '5%', height: '7%' },
        { id: 'jiangxi', name: '江西省', abbr: '赣', center: '南昌', top: '52%', left: '67%', width: '5%', height: '8%' },
        { id: 'shandong', name: '山东省', abbr: '鲁', center: '济南', top: '34%', left: '69%', width: '7%', height: '6%' },
        { id: 'henan', name: '河南省', abbr: '豫', center: '郑州', top: '40%', left: '62%', width: '7%', height: '6%' },
        { id: 'hubei', name: '湖北省', abbr: '鄂', center: '武汉', top: '46%', left: '60%', width: '8%', height: '5%' },
        { id: 'hunan', name: '湖南省', abbr: '湘', center: '长沙', top: '52%', left: '61%', width: '5%', height: '7%' },
        { id: 'guangdong', name: '广东省', abbr: '粤', center: '广州', top: '61%', left: '63%', width: '9%', height: '5%' },
        { id: 'guangxi', name: '广西壮族自治区', abbr: '桂', center: '南宁', top: '61%', left: '54%', width: '7%', height: '7%' },
        { id: 'hainan', name: '海南省', abbr: '琼', center: '海口', top: '72%', left: '57.5%', width: '3%', height: '3%' },
        { id: 'sichuan', name: '四川省', abbr: '川', center: '成都', top: '44.5%', left: '42%', width: '9%', height: '9%' },
        { id: 'guizhou', name: '贵州省', abbr: '黔', center: '贵阳', top: '54.5%', left: '51%', width: '6.5%', height: '6.5%' },
        { id: 'yunnan', name: '云南省', abbr: '滇', center: '昆明', top: '58%', left: '41%', width: '8%', height: '7%' },
        { id: 'xizang', name: '西藏自治区', abbr: '藏', center: '拉萨', top: '40%', left: '11%', width: '20%', height: '11%' },
        { id: 'shaanxi', name: '陕西省', abbr: '陕', center: '西安', top: '34%', left: '56%', width: '5%', height: '12%' },
        { id: 'gansu', name: '甘肃省', abbr: '甘', center: '兰州', top: '35%', left: '48%', width: '5%', height: '8%' },
        { id: 'qinghai', name: '青海省', abbr: '青', center: '西宁', top: '32%', left: '32%', width: '12%', height: '9%' },
        { id: 'ningxia', name: '宁夏回族自治区', abbr: '宁', center: '银川', top: '33%', left: '52.5%', width: '3%', height: '6%' },
        { id: 'xinjiang', name: '新疆维吾尔自治区', abbr: '新', center: '乌鲁木齐', top: '15%', left: '11%', width: '20%', height: '15%' },
        { id: 'taiwan', name: '台湾省', abbr: '台', center: '台北', top: '61%', left: '79%', width: '2%', height: '4%' },
        { id: 'xianggang', name: '香港特别行政区', abbr: '港', center: '香港', top: '66%', left: '67.5%', width: '2%', height: '2%' },
        { id: 'aomen', name: '澳门特别行政区', abbr: '澳', center: '澳门', top: '66.5%', left: '65%', width: '2%', height: '2%' }
    ];

    const TOTAL_PROVINCES = PROVINCE_DATA.length;
    const MAX_ACTIVE_BLOCKS = 5;
    const GAME_CONTROLLER_ICON = "🎮";

    // ==========================================
    // 2. 游戏状态管理
    // ==========================================
    let gameState = {
        isRunning: false,
        currentPhase: 1,
        progress: {},
        phase1CompletedCount: 0,
        phase2CompletedCount: 0,
        timerId: null,
        phase1Time: 0,
        phase2Time: 0,
        fallingBlockInterval: null,
        musicPlaying: false,
        gameCompleted: false,
        isPhaseTransition: false
    };

    // ==========================================
    // 3. DOM 元素引用
    // ==========================================
    const provincesOverlay = document.getElementById('provinces-overlay');
    const fallingArena = document.getElementById('falling-arena');
    const startBtn = document.getElementById('start-game-btn');
    const continueBtn = document.getElementById('continue-game-btn');
    const statusText = document.getElementById('game-status');
    const progressText = document.getElementById('progress-text');
    const timerPhase1Text = document.getElementById('timer-phase1');
    const timerPhase2Text = document.getElementById('timer-phase2');
    const timerPhase1Box = document.querySelector('.phase1-timer');
    const timerPhase2Box = document.querySelector('.phase2-timer');
    const arenaPlaceholderText = document.querySelector('.arena-placeholder-text');
    const backgroundMusic = document.getElementById('background-music');
    const celebrationMusic = document.getElementById('celebration-music');
    const chinaMapBg = document.getElementById('china-map-bg');
    const chinaMapColorful = document.getElementById('china-map-colorful');
    const completionEffects = document.getElementById('completion-effects');
    const celebrationModal = document.getElementById('celebration-modal');
    const restartBtn = document.getElementById('restart-btn');
    const finalPhase1Time = document.getElementById('final-phase1-time');
    const finalPhase2Time = document.getElementById('final-phase2-time');
    const finalTotalTime = document.getElementById('final-total-time');

    // ==========================================
    // 4. 辅助函数
    // ==========================================
    function formatTime(totalSeconds) {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    // 创建特效函数
    function createCelebrationEffects() {
        const effectsContainer = completionEffects;
        effectsContainer.innerHTML = '';
        effectsContainer.classList.remove('hidden');
        
        // 创建彩色星星
        for (let i = 0; i < 30; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.width = `${Math.random() * 20 + 10}px`;
            star.style.height = star.style.width;
            star.style.background = `hsl(${Math.random() * 360}, 100%, 50%)`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            effectsContainer.appendChild(star);
        }
        
        // 创建彩带
        for (let i = 0; i < 20; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.background = `hsl(${Math.random() * 360}, 100%, 60%)`;
            confetti.style.animationDelay = `${Math.random() * 5}s`;
            effectsContainer.appendChild(confetti);
        }
    }

    // 显示彩色地图
    function showColorfulMap() {
        chinaMapBg.style.opacity = '0';
        chinaMapColorful.classList.remove('hidden');
        setTimeout(() => {
            chinaMapBg.style.display = 'none';
        }, 1000);
    }

    // 显示庆祝弹窗
    function showCelebrationModal() {
        // 计算总时间 = 第一关时间 + 第二关时间
        const totalTime = gameState.phase1Time + gameState.phase2Time;
        
        finalPhase1Time.textContent = formatTime(gameState.phase1Time);
        finalPhase2Time.textContent = formatTime(gameState.phase2Time);
        finalTotalTime.textContent = formatTime(totalTime);  // 使用计算后的总时间
        
        celebrationModal.classList.remove('hidden');
        
        // 播放祝贺音乐
        if (celebrationMusic) {
            celebrationMusic.play().catch(err => {
                console.error("祝贺音乐播放失败:", err);
            });
        }
    }

    // 显示关卡过渡弹窗
    function showPhaseTransitionModal() {
        gameState.isPhaseTransition = true;
        
        // 创建过渡弹窗
        const transitionOverlay = document.createElement('div');
        transitionOverlay.className = 'phase-transition-overlay';
        transitionOverlay.id = 'phase-transition-overlay';
        
        const transitionContent = `
            <div class="phase-transition-content">
                <h2>🎉 恭喜完成第一关！ 🎉</h2>
                <p>您成功匹配了所有34个省份的简称！</p>
                <p>第一关用时: ${formatTime(gameState.phase1Time)}</p>
                <p>准备好迎接第二关的挑战了吗？</p>
                <button id="continue-phase2-btn" class="cartoon-btn">继续挑战第二关</button>
            </div>
        `;
        
        transitionOverlay.innerHTML = transitionContent;
        document.body.appendChild(transitionOverlay);
        
        // 添加继续按钮事件
        setTimeout(() => {
            document.getElementById('continue-phase2-btn').addEventListener('click', () => {
                transitionOverlay.remove();
                gameState.isPhaseTransition = false;
                transitionToPhase2();
            });
        }, 100);
    }

    function initGameState() {
        gameState = {
            isRunning: false,
            currentPhase: 1,
            progress: {},
            phase1CompletedCount: 0,
            phase2CompletedCount: 0,
            timerId: null,
            phase1Time: 0,
            phase2Time: 0,
            fallingBlockInterval: null,
            musicPlaying: false,
            gameCompleted: false,
            isPhaseTransition: false
        };

        PROVINCE_DATA.forEach(p => {
            gameState.progress[p.id] = { abbr: false, center: false };
        });

        startBtn.textContent = "开始挑战!";
        startBtn.disabled = false;
        if (continueBtn) {
            continueBtn.classList.add('hidden');
        }
        timerPhase1Box.classList.remove('disabled');
        timerPhase2Box.classList.add('disabled');
        arenaPlaceholderText.style.display = 'block';

        // 重置地图显示
        chinaMapBg.style.display = 'block';
        chinaMapBg.style.opacity = '0.8';
        chinaMapColorful.classList.add('hidden');
        completionEffects.classList.add('hidden');
        celebrationModal.classList.add('hidden');

        // 清理所有地图区域的样式和内容
        document.querySelectorAll('.province-area').forEach(el => {
            el.classList.remove('matched-abbr', 'matched-center', 'drag-over', 'phase2-waiting', 'touch-hover');
            el.style.backgroundColor = 'transparent';
            el.innerHTML = '';
            el.style.color = 'transparent';
        });

        // 停止音乐
        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
            gameState.musicPlaying = false;
        }
        
        if (celebrationMusic) {
            celebrationMusic.pause();
            celebrationMusic.currentTime = 0;
        }

        updateUI();
    }

    function updateUI() {
        const currentCompleted = gameState.currentPhase === 1 
            ? gameState.phase1CompletedCount 
            : gameState.phase2CompletedCount;
        
        progressText.textContent = `${currentCompleted} / ${TOTAL_PROVINCES}`;
        timerPhase1Text.textContent = formatTime(gameState.phase1Time);
        timerPhase2Text.textContent = formatTime(gameState.phase2Time);

        if (gameState.isRunning) {
            statusText.textContent = gameState.currentPhase === 1
                ? `${GAME_CONTROLLER_ICON} 第一关：拖拽 <简称> 匹配省份 (${gameState.phase1CompletedCount}/${TOTAL_PROVINCES})`
                : `${GAME_CONTROLLER_ICON} 第二关：拖拽 <行政中心> 匹配省份 (${gameState.phase2CompletedCount}/${TOTAL_PROVINCES})`;
        } else if (gameState.isPhaseTransition) {
            statusText.textContent = `${GAME_CONTROLLER_ICON} 第一关完成！准备进入第二关...`;
        } else {
            statusText.textContent = `${GAME_CONTROLLER_ICON} 点击"开始挑战"按钮开始游戏!`;
        }
    }

    function updateTimerByPhase() {
        if (!gameState.isRunning || gameState.isPhaseTransition) return;
        
        if (gameState.currentPhase === 1) {
            gameState.phase1Time++;
        } else {
            gameState.phase2Time++;
        }
        
        updateUI();
    }

    function createMapRegions() {
        provincesOverlay.innerHTML = '';
        PROVINCE_DATA.forEach(province => {
            const area = document.createElement('div');
            area.className = 'province-area';
            area.dataset.provinceId = province.id;
            area.style.position = 'absolute';
            area.style.top = province.top;
            area.style.left = province.left;
            area.style.width = province.width;
            area.style.height = province.height;
            provincesOverlay.appendChild(area);
        });
    }

    // ==========================================
    // 5. 方块生成与动画
    // ==========================================
    function spawnAndFallBlock() {
        if (!gameState.isRunning || gameState.gameCompleted || gameState.isPhaseTransition) return;

        const activeBlocks = fallingArena.querySelectorAll('.falling-block').length;
        if (activeBlocks >= MAX_ACTIVE_BLOCKS) return;

        const availableBlocks = PROVINCE_DATA.filter(p => {
            const pState = gameState.progress[p.id];
            return gameState.currentPhase === 1 
                ? !pState.abbr 
                : pState.abbr && !pState.center;
        });

        if (availableBlocks.length === 0) {
            return;
        }

        const randomIndex = Math.floor(Math.random() * availableBlocks.length);
        const blockData = availableBlocks[randomIndex];

        const blockEl = document.createElement('div');
        blockEl.classList.add('falling-block');
        blockEl.textContent = gameState.currentPhase === 1 ? blockData.abbr : blockData.center;
        blockEl.draggable = true;
        blockEl.dataset.type = gameState.currentPhase === 1 ? 'abbr' : 'center';
        blockEl.dataset.provinceId = blockData.id;
        blockEl.dataset.value = blockEl.textContent;

        // 关键修复：先添加元素到DOM以获取实际宽度
        fallingArena.appendChild(blockEl);
        
        // 获取方块的实际宽度
        const blockWidth = blockEl.offsetWidth;
        const arenaWidth = fallingArena.clientWidth;
        
        // 确保方块不会超出竞技场边界
        const maxLeft = Math.max(0, arenaWidth - blockWidth - 20);
        const randomLeft = Math.random() * maxLeft;
        
        blockEl.style.left = `${randomLeft}px`;

        const fallingAnimation = anime({
            targets: blockEl,
            translateY: [0, fallingArena.clientHeight + 50],
            easing: 'linear',
            duration: 10000,
            autoplay: true,
            complete: () => {
                if (blockEl.parentNode === fallingArena) {
                    blockEl.remove();
                    if (gameState.isRunning && !gameState.gameCompleted) {
                        console.warn(`方块 "${blockEl.textContent}" 掉落出界！`);
                    }
                }
            }
        });
        blockEl.animationInstance = fallingAnimation;
    }

    // ==========================================
    // 6. 触摸拖拽功能
    // ==========================================
    function setupTouchDrag() {
        let touchDraggedBlock = null;
        let touchStartX = 0;
        let touchStartY = 0;
        
        // 触摸开始
        document.addEventListener('touchstart', function(e) {
            if (!gameState.isRunning || gameState.isPhaseTransition) return;
            
            const touch = e.touches[0];
            const target = document.elementFromPoint(touch.clientX, touch.clientY);
            
            if (target && target.classList.contains('falling-block')) {
                e.preventDefault();
                touchDraggedBlock = target;
                touchStartX = touch.clientX;
                touchStartY = touch.clientY;
                
                // 添加触摸激活样式
                touchDraggedBlock.classList.add('touch-active');
                
                // 停止动画
                if (touchDraggedBlock.animationInstance) {
                    touchDraggedBlock.animationInstance.pause();
                    anime.remove(touchDraggedBlock);
                }
                
                // 创建拖拽数据
                const blockData = {
                    type: touchDraggedBlock.dataset.type,
                    provinceId: touchDraggedBlock.dataset.provinceId,
                    value: touchDraggedBlock.dataset.value
                };
                touchDraggedBlock.dataset.dragData = JSON.stringify(blockData);
            }
        }, { passive: false });
        
        // 触摸移动
        document.addEventListener('touchmove', function(e) {
            if (!touchDraggedBlock) return;
            e.preventDefault();
            
            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            // 更新方块位置
            touchDraggedBlock.style.position = 'fixed';
            touchDraggedBlock.style.left = `${touch.clientX - touchDraggedBlock.offsetWidth / 2}px`;
            touchDraggedBlock.style.top = `${touch.clientY - touchDraggedBlock.offsetHeight / 2}px`;
            touchDraggedBlock.style.zIndex = '9999';
            
            // 检查是否悬停在省份区域上
            const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
            const provinceArea = elementUnderTouch?.closest('.province-area');
            
            // 清除所有区域的悬停效果
            document.querySelectorAll('.province-area').forEach(area => {
                area.classList.remove('drag-over', 'touch-hover');
            });
            
            // 添加当前区域的悬停效果
            if (provinceArea) {
                provinceArea.classList.add('drag-over', 'touch-hover');
            }
        }, { passive: false });
        
        // 触摸结束
        document.addEventListener('touchend', function(e) {
            if (!touchDraggedBlock) return;
            e.preventDefault();
            
            const touch = e.changedTouches[0];
            const elementUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
            const provinceArea = elementUnderTouch?.closest('.province-area');
            
            // 移除触摸激活样式
            touchDraggedBlock.classList.remove('touch-active');
            
            if (provinceArea && touchDraggedBlock.dataset.dragData) {
                // 处理拖放匹配
                try {
                    const dragData = JSON.parse(touchDraggedBlock.dataset.dragData);
                    handleDrop(provinceArea, dragData);
                } catch (error) {
                    console.error("解析拖放数据失败:", error);
                }
            } else {
                // 如果没有匹配，回到掉落区域继续下落
                touchDraggedBlock.style.position = '';
                touchDraggedBlock.style.left = '';
                touchDraggedBlock.style.top = '';
                touchDraggedBlock.style.zIndex = '';
                
                // 恢复动画
                const arenaRect = fallingArena.getBoundingClientRect();
                const blockRect = touchDraggedBlock.getBoundingClientRect();
                
                anime({
                    targets: touchDraggedBlock,
                    left: `${blockRect.left - arenaRect.left}px`,
                    translateY: [0, fallingArena.clientHeight + 50],
                    easing: 'linear',
                    duration: 10000,
                    complete: () => {
                        if (touchDraggedBlock.parentNode === fallingArena) {
                            touchDraggedBlock.remove();
                        }
                    }
                });
            }
            
            // 清除悬停效果
            document.querySelectorAll('.province-area').forEach(area => {
                area.classList.remove('drag-over', 'touch-hover');
            });
            
            // 清理
            delete touchDraggedBlock.dataset.dragData;
            touchDraggedBlock = null;
        }, { passive: false });
    }

    // ==========================================
    // 7. 游戏控制逻辑
    // ==========================================
    function startGame() {
        if (gameState.isRunning) {
            stopGame();
            initGameState();
            createMapRegions();
        }
        
        if (!gameState.isRunning) {
            gameState.isRunning = true;
            gameState.gameCompleted = false;
            gameState.isPhaseTransition = false;
            startBtn.textContent = "游戏中...";
            startBtn.disabled = true;
            if (continueBtn) {
                continueBtn.classList.add('hidden');
            }
            arenaPlaceholderText.style.display = 'none';

            // 播放背景音乐
            if (backgroundMusic) {
                backgroundMusic.play().then(() => {
                    gameState.musicPlaying = true;
                }).catch(e => {
                    console.error("背景音乐播放失败:", e);
                    statusText.textContent = "背景音乐播放失败，请检查音频文件";
                });
            }

            // 启动计时器
            if (gameState.timerId) {
                clearInterval(gameState.timerId);
            }
            gameState.timerId = setInterval(updateTimerByPhase, 1000);
            
            gameState.fallingBlockInterval = setInterval(spawnAndFallBlock, 2000);
            spawnAndFallBlock();
            updateUI();
        }
    }

    function stopGame() {
        gameState.isRunning = false;
        gameState.isPhaseTransition = false;
        clearInterval(gameState.timerId);
        clearInterval(gameState.fallingBlockInterval);
        startBtn.textContent = "重新挑战";
        startBtn.disabled = false;

        if (backgroundMusic) {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
        gameState.musicPlaying = false;

        anime.remove('.falling-block');
        fallingArena.querySelectorAll('.falling-block').forEach(el => el.remove());
        
        arenaPlaceholderText.style.display = 'block';

        if (!gameState.gameCompleted) {
            statusText.textContent = `${GAME_CONTROLLER_ICON} 游戏已停止。再次点击'开始挑战'开始！`;
        }
    }

    function transitionToPhase2() {
        gameState.currentPhase = 2;
        gameState.phase2CompletedCount = 0;

        clearInterval(gameState.fallingBlockInterval);
        anime.remove('.falling-block');
        fallingArena.querySelectorAll('.falling-block').forEach(el => el.remove());

        timerPhase1Box.classList.add('disabled');
        timerPhase2Box.classList.remove('disabled');

        document.querySelectorAll('.province-area').forEach(el => {
            const pid = el.dataset.provinceId;
            const data = PROVINCE_DATA.find(p => p.id === pid);
            el.classList.remove('matched-abbr', 'drag-over', 'touch-hover');
            el.classList.add('phase2-waiting');
            el.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
            el.innerHTML = `<span>${data.abbr}</span>`;
            el.style.color = 'black';
        });

        // 重新开始游戏并启动计时器
        gameState.isRunning = true;
        
        // 确保计时器已经停止
        if (gameState.timerId) {
            clearInterval(gameState.timerId);
        }
        
        // 重新启动计时器
        gameState.timerId = setInterval(updateTimerByPhase, 1000);
        
        gameState.fallingBlockInterval = setInterval(spawnAndFallBlock, 2000);
        spawnAndFallBlock();
        updateUI();
    }

    // 完成游戏庆祝
    function completeGame() {
        gameState.gameCompleted = true;
        gameState.isRunning = false;
        gameState.isPhaseTransition = false;
        
        clearInterval(gameState.timerId);
        clearInterval(gameState.fallingBlockInterval);
        
        anime.remove('.falling-block');
        fallingArena.querySelectorAll('.falling-block').forEach(el => el.remove());
        
        // 停止背景音乐
        if (backgroundMusic) {
            backgroundMusic.pause();
        }
        
        // 显示彩色地图
        showColorfulMap();
        
        // 创建庆祝特效
        createCelebrationEffects();
        
        // 延迟显示庆祝弹窗
        setTimeout(() => {
            showCelebrationModal();
        }, 2500);
        
        startBtn.textContent = "重新挑战";
        startBtn.disabled = false;
    }

    // 处理拖放匹配
    function handleDrop(targetProvinceArea, dragData) {
        const { type: draggedType, provinceId: draggedProvinceId, value: draggedValue } = dragData;
        const targetProvinceId = targetProvinceArea.dataset.provinceId;
        
        const currentProvinceData = PROVINCE_DATA.find(p => p.id === targetProvinceId);
        if (!currentProvinceData) {
            console.error("未找到目标省份数据:", targetProvinceId);
            return false;
        }
        
        let isMatchSuccess = false;
        
        if (draggedProvinceId === targetProvinceId) {
            if (gameState.currentPhase === 1 && draggedType === 'abbr' && draggedValue === currentProvinceData.abbr && !gameState.progress[draggedProvinceId].abbr) {
                gameState.progress[draggedProvinceId].abbr = true;
                gameState.phase1CompletedCount++;
                targetProvinceArea.classList.add('matched-abbr');
                targetProvinceArea.style.backgroundColor = '';
                targetProvinceArea.innerHTML = `<span>${currentProvinceData.abbr}</span>`;
                targetProvinceArea.style.color = 'black';
                isMatchSuccess = true;
                
                // 检查是否完成第一关
                if (gameState.phase1CompletedCount === TOTAL_PROVINCES) {
                    setTimeout(() => {
                        // 暂停游戏，显示过渡弹窗
                        clearInterval(gameState.timerId);
                        clearInterval(gameState.fallingBlockInterval);
                        gameState.isRunning = false;
                        anime.remove('.falling-block');
                        fallingArena.querySelectorAll('.falling-block').forEach(el => el.remove());
                        
                        // 显示过渡弹窗
                        showPhaseTransitionModal();
                    }, 1000);
                }
                
            } else if (gameState.currentPhase === 2 && draggedType === 'center' && draggedValue === currentProvinceData.center && gameState.progress[draggedProvinceId].abbr && !gameState.progress[draggedProvinceId].center) {
                gameState.progress[draggedProvinceId].center = true;
                gameState.phase2CompletedCount++;
                targetProvinceArea.classList.remove('phase2-waiting');
                targetProvinceArea.classList.add('matched-center');
                targetProvinceArea.style.backgroundColor = '';
                targetProvinceArea.innerHTML = `<span>${currentProvinceData.abbr}</span><br><span style="font-size: 0.7em;">${currentProvinceData.center}</span>`;
                targetProvinceArea.style.color = 'black';
                isMatchSuccess = true;
                
                // 检查是否完成第二关
                if (gameState.phase2CompletedCount === TOTAL_PROVINCES) {
                    setTimeout(() => {
                        completeGame();
                    }, 1000);
                }
            }
        }
        
        updateUI();
        
        if (!isMatchSuccess) {
            console.log(`匹配失败或重复匹配: 拖拽值 "${draggedValue}" 到省份 "${currentProvinceData.name}"`);
            targetProvinceArea.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
            setTimeout(() => {
                if (gameState.currentPhase === 1 && !gameState.progress[targetProvinceId].abbr) {
                    targetProvinceArea.style.backgroundColor = 'transparent';
                } else if (gameState.currentPhase === 2 && gameState.progress[targetProvinceId].abbr && !gameState.progress[targetProvinceId].center) {
                    targetProvinceArea.style.backgroundColor = 'rgba(0, 255, 0, 0.1)';
                } else {
                    targetProvinceArea.style.backgroundColor = '';
                }
            }, 500);
        }
        
        return isMatchSuccess;
    }

    // ==========================================
    // 8. 事件监听器
    // ==========================================
    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }
    
    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            continueBtn.classList.add('hidden');
            transitionToPhase2();
        });
    }
    
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            celebrationModal.classList.add('hidden');
            initGameState();
            createMapRegions();
        });
    }

    // 鼠标拖放事件处理
    fallingArena.addEventListener('dragstart', e => {
        if (e.target.classList.contains('falling-block')) {
            const blockEl = e.target;
            const blockData = {
                type: blockEl.dataset.type,
                provinceId: blockEl.dataset.provinceId,
                value: blockEl.dataset.value
            };
            e.dataTransfer.setData('application/json', JSON.stringify(blockData));
            e.dataTransfer.effectAllowed = 'move';

            if (blockEl.animationInstance) {
                blockEl.animationInstance.pause();
                anime.remove(blockEl);
            }

            setTimeout(() => {
                if (blockEl.parentNode === fallingArena) {
                    blockEl.remove();
                }
            }, 0);
        }
    });

    provincesOverlay.addEventListener('dragover', e => {
        e.preventDefault();
        const targetProvinceArea = e.target.closest('.province-area');
        if (targetProvinceArea) {
            targetProvinceArea.classList.add('drag-over');
        }
    });

    provincesOverlay.addEventListener('dragleave', e => {
        const targetProvinceArea = e.target.closest('.province-area');
        if (targetProvinceArea) {
            targetProvinceArea.classList.remove('drag-over');
        }
    });

    provincesOverlay.addEventListener('drop', e => {
        e.preventDefault();
        e.stopPropagation();

        const targetProvinceArea = e.target.closest('.province-area');
        if (!targetProvinceArea) return;

        targetProvinceArea.classList.remove('drag-over', 'touch-hover');

        try {
            const jsonData = e.dataTransfer.getData('application/json');
            if (!jsonData || !jsonData.trim()) {
                console.error("拖放数据为空或无法读取。");
                statusText.textContent = "拖放数据无效，请重试！";
                return;
            }

            const dragData = JSON.parse(jsonData);
            handleDrop(targetProvinceArea, dragData);
            
        } catch (error) {
            console.error("解析拖放数据失败:", error);
            statusText.textContent = "拖放处理发生错误！";
        }
    });

    // ==========================================
    // 9. 初始化入口
    // ==========================================
    initGameState();
    createMapRegions();
    updateUI();
    setupTouchDrag();  // 初始化触摸拖拽功能

    // 初始入场动画
    anime({
        targets: '.game-container',
        scale: [0.95, 1],
        opacity: [0, 1],
        duration: 800,
        easing: 'easeOutElastic(1, .8)'
    });
});