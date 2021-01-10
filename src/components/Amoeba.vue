<template>
    <div :class="[{'active': player1}, 'player']">Player X</div>
    <div>
        <div class="amoeba">
            <button
                v-for="num in 9" 
                :key="num"
                :class="`box box${num}`"
                :disabled="boxValues[num] || !!winner"
                @click="onClick(num)"
            >
                {{boxValues[num]}}
            </button>
        </div>
        <div v-if="!!winner" class="winner">WINNER: {{winner}}</div>
    </div>
    <div :class="[{'active': !player1}, 'player' ]">Player O</div>
</template>

<script>
    const WINNING_COMBINATIONS = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]
    ]

    export default {
        name: 'Amoeba',
        data() {
            return {
                player1: true,
                winner: null,
                boxValues: {
                    1: null,
                    2: null,
                    3: null,
                    4: null,
                    5: null,
                    6: null,
                    7: null,
                    8: null,
                    9: null,
                }
            }
        },
        computed: {
            currentPlayer() {
                return this.player1 ? 'X' : 'O'
            },
            currentPlayerValues() {
                const values = []
                for (let i in this.boxValues) {
                    if (this.boxValues[i] === this.currentPlayer) {
                        values.push(i)
                    }
                }
                return values
            }
        },
        methods: {
            onClick(value) {
                this.boxValues[value] = this.currentPlayer

                if (this.evaluate()) {
                    this.winner = this.currentPlayer
                    return
                } 

                this.switchPlayer()
            },
            evaluate() {
                return WINNING_COMBINATIONS.some(comb => comb.every(value => this.currentPlayerValues.includes(value.toString())))
            },
            switchPlayer() {
                this.player1 = !this.player1
            }
        }
    }
</script>

<style>
    .amoeba {
        display: grid;
        grid-template-rows: 10rem 10rem 10rem;
        grid-template-columns: 10rem 10rem 10rem;
    }

    .box {
        background: #444;
        border: 1px solid #555;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #aaa;
        font-size: 5rem;
    }

    button:not(:disabled):hover {
        background-color: #373636;
        cursor: pointer;
    }

    .player {
        margin: 0 2rem;
        font-size: 1.5rem;
        font-weight: 600;
    }

    .active {
        color: #f0b15f;
    }

    .winner {
        padding: 1rem;
        color: #75c675;
        font-weight: 600;
        font-size: 2rem;
    }
</style>