import { beforeEach, afterEach, describe, expect, it, vi } from "vitest";

const businessHours = [9, 17];

const purchase = () => {
  const currentHour = new Date().getHours();
  const [open, close] = businessHours;

  if (currentHour > open && currentHour < close) {
    return { message: "Success" };
  }

  return { message: "Error" };
};

describe("purchasing flow", () => {
  beforeEach(() => {
    // 告诉 vitest 我们使用模拟时间
    vi.useFakeTimers();
  });

  afterEach(() => {
    // 每次测试运行后恢复日期
    vi.useRealTimers();
  });

  it("allows purchases within business hours", () => {
    // 在营业时间内设定时间
    const date = new Date(2000, 1, 1, 13);
    vi.setSystemTime(date);

    // 访问 Date.now() 将导致上面设置的日期
    expect(purchase()).toEqual({ message: "Success" });
  });

  it("disallows purchases outside of business hours", () => {
    // 设置营业时间以外的时间
    const date = new Date(2000, 1, 1, 19);
    vi.setSystemTime(date);

    // 访问 Date.now() 将导致上面设置的日期
    expect(purchase()).toEqual({ message: "Error" });
  });
});
