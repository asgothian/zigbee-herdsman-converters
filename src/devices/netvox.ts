import * as fz from "../converters/fromZigbee";
import * as tz from "../converters/toZigbee";
import * as exposes from "../lib/exposes";
import * as reporting from "../lib/reporting";
import type {DefinitionWithExtend} from "../lib/types";

const e = exposes.presets;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["Z809AE3R"],
        model: "Z809A",
        vendor: "Netvox",
        description: "Power socket with power consumption monitoring",
        fromZigbee: [fz.on_off, fz.electrical_measurement],
        toZigbee: [tz.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "haElectricalMeasurement"]);
            await reporting.onOff(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
            await reporting.powerFactor(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        zigbeeModel: ["ZB02AE0ED"],
        model: "ZB02A",
        vendor: "Netvox",
        description: "Wireless wall switch",
        fromZigbee: [fz.command_toggle],
        toZigbee: [],
        exposes: [e.action(["toggle"])],
    },
];
