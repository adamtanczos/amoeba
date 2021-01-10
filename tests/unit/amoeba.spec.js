import { mount } from "@vue/test-utils";
import Amoeba from "@/components/Amoeba.vue";

test("switches active player", () => {
    const wrapper = mount(Amoeba);
    const box1 = wrapper.find("button.box1");

    expect(wrapper.vm.player1).toBe(true);

    box1.trigger("click");

    expect(wrapper.vm.player1).toBe(false);
});

test("player X wins with 3 boxes next to each other", () => {
    const wrapper = mount(Amoeba);
    const box1 = wrapper.find("button.box1");
    const box2 = wrapper.find("button.box2");
    const box3 = wrapper.find("button.box3");
    const box4 = wrapper.find("button.box4");
    const box5 = wrapper.find("button.box5");

    box1.trigger("click");
    box4.trigger("click");
    box2.trigger("click");
    box5.trigger("click");
    box3.trigger("click");

    expect(wrapper.vm.winner).toBe("X");
});

test("player O wins with 3 diagonal boxes", () => {
    const wrapper = mount(Amoeba);
    const box1 = wrapper.find("button.box1");
    const box2 = wrapper.find("button.box2");
    const box3 = wrapper.find("button.box3");
    const box4 = wrapper.find("button.box4");
    const box5 = wrapper.find("button.box5");
    const box7 = wrapper.find("button.box7");

    box1.trigger("click");
    box3.trigger("click");
    box2.trigger("click");
    box5.trigger("click");
    box4.trigger("click");
    box7.trigger("click");

    expect(wrapper.vm.winner).toBe("O");
});
