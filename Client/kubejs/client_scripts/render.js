CuriosJSEvents.registerRenderer(event => {
    // remove curios render
    //event.remove('test')

    // register curios render
    event.register(
        'rainbow:sunglasses',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context
            let { modelManager } = Client
            let entity = slotContext.entity()
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
            matrixStack.pushPose()
            CuriosRenderer.translateIfSneaking(matrixStack, entity)
            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
            matrixStack.mulPose(RotationAxis.YP.deg(-netHeadYaw))
            matrixStack.mulPose(RotationAxis.XP.deg(-headPitch))
            matrixStack.translate(0, -0.4, -0.65)
            matrixStack.scale(0.9,0.9,0.9)
            Client.itemRenderer.render(
                stack,
                'head',
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            )
            matrixStack.popPose()
        }
    )

    event.register(
        'farmersdelight:skillet',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context
            let { modelManager } = Client
            let entity = slotContext.entity()
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
            matrixStack.pushPose()
            CuriosRenderer.translateIfSneaking(matrixStack, entity)
            matrixStack.mulPose(RotationAxis.YP.deg(netHeadYaw))
            matrixStack.mulPose(RotationAxis.XP.deg(headPitch));
            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
            matrixStack.mulPose(new Quaternionf().rotateY(JavaMath.toRadians(90)))
            matrixStack.scale(0.8,0.8,0.8)
            matrixStack.translate(0, 0.2, 0)
            Client.itemRenderer.render(
                stack,
                'head',
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            )
            matrixStack.popPose()
        }
    )

    event.register(
        'dungeonsdelight:golden_cleaver',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context
            let { modelManager } = Client
            let entity = slotContext.entity()
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
            matrixStack.pushPose()
            CuriosRenderer.translateIfSneaking(matrixStack, entity)
            matrixStack.mulPose(RotationAxis.YP.deg(netHeadYaw))
            matrixStack.mulPose(RotationAxis.XP.deg(headPitch));
            matrixStack.scale(0.8,0.8,0.8)
            matrixStack.translate(-0.3,-1.8, -0.4)
            Client.itemRenderer.render(
                stack,
                'head',
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            )
            matrixStack.popPose()
        }
    )

    event.register(
        'rainbow:eldritch_pan',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context
            let { modelManager } = Client
            let entity = slotContext.entity()
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
            matrixStack.pushPose()
            CuriosRenderer.translateIfSneaking(matrixStack, entity)
            matrixStack.mulPose(RotationAxis.YP.deg(netHeadYaw))
            matrixStack.mulPose(RotationAxis.XP.deg(headPitch))
            matrixStack.translate(0, -1.0, 0)
            Client.itemRenderer.render(
                stack,
                'head',
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            )
            matrixStack.popPose()
        }
    )

    event.register(
        'farmersdelight:basket',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context
            let { modelManager } = Client
            let entity = slotContext.entity()
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'))
            matrixStack.pushPose()
            CuriosRenderer.translateIfSneaking(matrixStack, entity)
            matrixStack.mulPose(RotationAxis.YP.deg(netHeadYaw))
            matrixStack.mulPose(RotationAxis.XP.deg(headPitch))
            matrixStack.translate(0, -0.2, 0)
            Client.itemRenderer.render(
                stack,
                'head',
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            )
            matrixStack.popPose()
        }
    )

    event.register(
        'minecraft:tnt',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context;
    
            let { modelManager } = Client;
            let entity = slotContext.entity();
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'));
    
            matrixStack.pushPose();
    
            // 玩家蹲下时微调位置
            CuriosRenderer.translateIfSneaking(matrixStack, entity);
    
            // 背部定位：偏移到背后，朝外
            matrixStack.translate(0.0, 0.3, 0.3); // X, Y, Z位置调整（Y适应高度，Z适应后背）

            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))

            // 缩放饰品
            matrixStack.scale(1, 1, 1);
    
            Client.itemRenderer.render(
                stack,
                'fixed', // 合法的渲染类型，用 'fixed' 或 'none' 即可
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            );
    
            matrixStack.popPose();
        }
    )
    
    event.register(
        'oreganized:shrapnel_bomb',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context;
    
            let { modelManager } = Client;
            let entity = slotContext.entity();
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'));
    
            matrixStack.pushPose();
    
            // 玩家蹲下时微调位置
            CuriosRenderer.translateIfSneaking(matrixStack, entity);
    
            // 背部定位：偏移到背后，朝外
            matrixStack.translate(0.0, 0.3, 0.3); // X, Y, Z位置调整（Y适应高度，Z适应后背）

            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))

            // 缩放饰品
            matrixStack.scale(1, 1, 1);
    
            Client.itemRenderer.render(
                stack,
                'fixed', // 合法的渲染类型，用 'fixed' 或 'none' 即可
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            );
    
            matrixStack.popPose();
        }
    )

    event.register(
        'savage_and_ravage:spore_bomb',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context;
    
            let { modelManager } = Client;
            let entity = slotContext.entity();
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'));
    
            matrixStack.pushPose();
    
            // 玩家蹲下时微调位置
            CuriosRenderer.translateIfSneaking(matrixStack, entity);
    
            // 背部定位：偏移到背后，朝外
            matrixStack.translate(0.0, 0.3, 0.3); // X, Y, Z位置调整（Y适应高度，Z适应后背）

            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))

            // 缩放饰品
            matrixStack.scale(1, 1, 1);
    
            Client.itemRenderer.render(
                stack,
                'fixed', // 合法的渲染类型，用 'fixed' 或 'none' 即可
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            );
    
            matrixStack.popPose();
        }
    )

    event.register(
        'minecraft:end_rod',
        context => {
            let {
                stack,
                slotContext,
                matrixStack,
                renderLayerParent,
                renderTypeBuffer,
                light,
                limbSwing,
                limbSwingAmount,
                partialTicks,
                ageInTicks,
                netHeadYaw,
                headPitch
            } = context;
    
            let { modelManager } = Client;
            let entity = slotContext.entity();
            let model = modelManager.getModel(new ModelResourceLocation(stack.id, 'inventory'));
    
            matrixStack.pushPose();
    
    
            // 背部定位：偏移到背后，朝外
            matrixStack.translate(0.0, 0.9, 0.3); // X, Y, Z位置调整（Y适应高度，Z适应后背）

            matrixStack.mulPose(new Quaternionf().rotateZ(JavaMath.toRadians(180)))
            matrixStack.mulPose(new Quaternionf().rotateX(JavaMath.toRadians(-45)))

            // 缩放饰品
            matrixStack.scale(1, 1, 1);
    
            Client.itemRenderer.render(
                stack,
                'fixed', // 合法的渲染类型，用 'fixed' 或 'none' 即可
                false,
                matrixStack,
                renderTypeBuffer,
                light,
                OverlayTexture.NO_OVERLAY,
                model
            );
    
            matrixStack.popPose();
        }
    )

})